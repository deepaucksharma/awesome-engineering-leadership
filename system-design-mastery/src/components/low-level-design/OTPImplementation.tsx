'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Code, FileCode, Database, Shield } from 'lucide-react'

export default function OTPImplementation() {
  const [selectedTab, setSelectedTab] = useState<'service' | 'redis' | 'api' | 'types'>('service')

  const codeExamples = {
    service: {
      title: 'OTP Service Implementation',
      language: 'typescript',
      code: `import crypto from 'crypto';
import { Redis } from 'ioredis';
import { RateLimiter } from './rateLimiter';
import { NotificationService } from './notificationService';

export class OTPService {
  private redis: Redis;
  private rateLimiter: RateLimiter;
  private notificationService: NotificationService;
  
  private readonly OTP_LENGTH = 6;
  private readonly OTP_TTL = 300; // 5 minutes
  private readonly MAX_ATTEMPTS = 3;
  private readonly RATE_LIMIT = { window: 3600, maxRequests: 10 }; // 10 per hour
  
  constructor(dependencies: OTPServiceDeps) {
    this.redis = dependencies.redis;
    this.rateLimiter = dependencies.rateLimiter;
    this.notificationService = dependencies.notificationService;
  }
  
  async generateOTP(userId: string, channel: 'SMS' | 'EMAIL', destination: string): Promise<OTPResponse> {
    try {
      // 1. Check rate limit
      const isAllowed = await this.rateLimiter.checkLimit(
        \`otp_generate:\${userId}\`,
        this.RATE_LIMIT.maxRequests,
        this.RATE_LIMIT.window
      );
      
      if (!isAllowed) {
        throw new RateLimitExceededError('Too many OTP requests. Please try again later.');
      }
      
      // 2. Generate secure OTP
      const otp = this.generateSecureOTP();
      
      // 3. Create OTP metadata
      const otpData: OTPData = {
        code: otp,
        userId,
        channel,
        destination,
        attempts: 0,
        createdAt: Date.now(),
        expiresAt: Date.now() + (this.OTP_TTL * 1000)
      };
      
      // 4. Store in Redis with TTL
      const key = \`otp:\${userId}:\${destination}\`;
      await this.redis.setex(
        key,
        this.OTP_TTL,
        JSON.stringify(otpData)
      );
      
      // 5. Send OTP asynchronously
      await this.notificationService.sendOTP({
        channel,
        destination,
        otp,
        userId
      });
      
      // 6. Log for audit
      await this.logOTPEvent('GENERATED', userId, destination);
      
      return {
        success: true,
        message: 'OTP sent successfully',
        expiresIn: this.OTP_TTL
      };
      
    } catch (error) {
      await this.logOTPEvent('GENERATION_FAILED', userId, destination, error.message);
      throw error;
    }
  }
  
  async verifyOTP(userId: string, destination: string, inputOTP: string): Promise<VerifyResponse> {
    const key = \`otp:\${userId}:\${destination}\`;
    
    try {
      // 1. Get OTP data from Redis
      const storedData = await this.redis.get(key);
      
      if (!storedData) {
        throw new OTPNotFoundError('OTP expired or not found');
      }
      
      const otpData: OTPData = JSON.parse(storedData);
      
      // 2. Check expiry
      if (Date.now() > otpData.expiresAt) {
        await this.redis.del(key);
        throw new OTPExpiredError('OTP has expired');
      }
      
      // 3. Check attempts
      if (otpData.attempts >= this.MAX_ATTEMPTS) {
        await this.redis.del(key);
        throw new MaxAttemptsExceededError('Maximum verification attempts exceeded');
      }
      
      // 4. Verify OTP
      if (otpData.code !== inputOTP) {
        // Increment attempt count
        otpData.attempts++;
        await this.redis.setex(
          key,
          Math.floor((otpData.expiresAt - Date.now()) / 1000),
          JSON.stringify(otpData)
        );
        
        await this.logOTPEvent('VERIFICATION_FAILED', userId, destination);
        
        throw new InvalidOTPError(
          \`Invalid OTP. \${this.MAX_ATTEMPTS - otpData.attempts} attempts remaining\`
        );
      }
      
      // 5. Success - Delete OTP
      await this.redis.del(key);
      
      // 6. Generate auth token
      const token = await this.generateAuthToken(userId);
      
      await this.logOTPEvent('VERIFIED', userId, destination);
      
      return {
        success: true,
        token,
        message: 'OTP verified successfully'
      };
      
    } catch (error) {
      if (!(error instanceof OTPError)) {
        await this.logOTPEvent('VERIFICATION_ERROR', userId, destination, error.message);
      }
      throw error;
    }
  }
  
  private generateSecureOTP(): string {
    const min = Math.pow(10, this.OTP_LENGTH - 1);
    const max = Math.pow(10, this.OTP_LENGTH) - 1;
    const randomBytes = crypto.randomBytes(4);
    const randomNumber = randomBytes.readUInt32BE(0);
    const otp = min + (randomNumber % (max - min + 1));
    return otp.toString();
  }
  
  private async logOTPEvent(
    event: string,
    userId: string,
    destination: string,
    error?: string
  ): Promise<void> {
    // Implement audit logging to database
    // This is critical for security and compliance
  }
  
  private async generateAuthToken(userId: string): Promise<string> {
    // Implement JWT token generation
    // Include user claims and expiry
  }
}`
    },
    redis: {
      title: 'Redis Operations & Caching',
      language: 'typescript',
      code: `import { Redis } from 'ioredis';

export class RedisOTPStore {
  private redis: Redis;
  
  constructor(redisUrl: string) {
    this.redis = new Redis(redisUrl, {
      retryStrategy: (times) => Math.min(times * 50, 2000),
      enableOfflineQueue: false,
      maxRetriesPerRequest: 3
    });
    
    this.redis.on('error', (err) => {
      console.error('Redis connection error:', err);
    });
  }
  
  // Atomic OTP operations using Lua scripts
  async storeOTPAtomic(key: string, data: OTPData, ttl: number): Promise<boolean> {
    const script = \`
      local key = KEYS[1]
      local data = ARGV[1]
      local ttl = ARGV[2]
      
      -- Check if OTP already exists
      local existing = redis.call('GET', key)
      if existing then
        return 0
      end
      
      -- Set new OTP with TTL
      redis.call('SETEX', key, ttl, data)
      return 1
    \`;
    
    const result = await this.redis.eval(
      script,
      1,
      key,
      JSON.stringify(data),
      ttl
    );
    
    return result === 1;
  }
  
  // Atomic increment attempts
  async incrementAttemptsAtomic(key: string): Promise<number | null> {
    const script = \`
      local key = KEYS[1]
      local maxAttempts = tonumber(ARGV[1])
      
      local data = redis.call('GET', key)
      if not data then
        return nil
      end
      
      local otpData = cjson.decode(data)
      otpData.attempts = otpData.attempts + 1
      
      if otpData.attempts > maxAttempts then
        redis.call('DEL', key)
        return -1
      end
      
      local ttl = redis.call('TTL', key)
      redis.call('SETEX', key, ttl, cjson.encode(otpData))
      
      return otpData.attempts
    \`;
    
    return await this.redis.eval(script, 1, key, 3);
  }
  
  // Distributed rate limiting with sliding window
  async checkRateLimit(identifier: string, limit: number, window: number): Promise<boolean> {
    const now = Date.now();
    const windowStart = now - (window * 1000);
    
    const pipe = this.redis.pipeline();
    
    // Remove old entries
    pipe.zremrangebyscore(identifier, '-inf', windowStart);
    
    // Count current entries
    pipe.zcard(identifier);
    
    // Add new entry if under limit
    pipe.zadd(identifier, now, \`\${now}-\${Math.random()}\`);
    
    // Set expiry
    pipe.expire(identifier, window);
    
    const results = await pipe.exec();
    const count = results[1][1] as number;
    
    if (count >= limit) {
      // Remove the entry we just added
      await this.redis.zrem(identifier, \`\${now}-\${Math.random()}\`);
      return false;
    }
    
    return true;
  }
  
  // Health check
  async ping(): Promise<boolean> {
    try {
      const response = await this.redis.ping();
      return response === 'PONG';
    } catch {
      return false;
    }
  }
  
  // Graceful shutdown
  async disconnect(): Promise<void> {
    await this.redis.quit();
  }
}`
    },
    api: {
      title: 'REST API Endpoints',
      language: 'typescript',
      code: `import { Request, Response, NextFunction } from 'express';
import { body, validationResult } from 'express-validator';
import { OTPService } from './otpService';

export class OTPController {
  constructor(private otpService: OTPService) {}
  
  // POST /api/otp/generate
  generateOTP = [
    // Validation middleware
    body('userId').isString().notEmpty(),
    body('channel').isIn(['SMS', 'EMAIL']),
    body('destination')
      .if(body('channel').equals('SMS'))
      .isMobilePhone('any')
      .if(body('channel').equals('EMAIL'))
      .isEmail(),
    
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        // Check validation errors
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
          return res.status(400).json({
            success: false,
            errors: errors.array()
          });
        }
        
        const { userId, channel, destination } = req.body;
        
        // Add request ID for tracing
        const requestId = req.headers['x-request-id'] || crypto.randomUUID();
        
        const result = await this.otpService.generateOTP(
          userId,
          channel,
          destination
        );
        
        res.status(200).json({
          ...result,
          requestId
        });
        
      } catch (error) {
        next(error);
      }
    }
  ];
  
  // POST /api/otp/verify
  verifyOTP = [
    // Validation middleware
    body('userId').isString().notEmpty(),
    body('destination').isString().notEmpty(),
    body('otp').isString().length(6).isNumeric(),
    
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
          return res.status(400).json({
            success: false,
            errors: errors.array()
          });
        }
        
        const { userId, destination, otp } = req.body;
        
        const result = await this.otpService.verifyOTP(
          userId,
          destination,
          otp
        );
        
        res.status(200).json(result);
        
      } catch (error) {
        next(error);
      }
    }
  ];
  
  // POST /api/otp/resend
  resendOTP = [
    body('userId').isString().notEmpty(),
    body('channel').isIn(['SMS', 'EMAIL']),
    body('destination').isString().notEmpty(),
    
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
          return res.status(400).json({
            success: false,
            errors: errors.array()
          });
        }
        
        // Additional cooldown check for resend
        const cooldownKey = \`resend_cooldown:\${req.body.userId}\`;
        const canResend = await this.checkResendCooldown(cooldownKey);
        
        if (!canResend) {
          return res.status(429).json({
            success: false,
            message: 'Please wait 30 seconds before resending'
          });
        }
        
        const { userId, channel, destination } = req.body;
        
        const result = await this.otpService.generateOTP(
          userId,
          channel,
          destination
        );
        
        res.status(200).json(result);
        
      } catch (error) {
        next(error);
      }
    }
  ];
}

// Error handling middleware
export const otpErrorHandler = (
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.error('OTP Error:', {
    error: error.message,
    stack: error.stack,
    requestId: req.headers['x-request-id'],
    userId: req.body.userId
  });
  
  if (error instanceof RateLimitExceededError) {
    return res.status(429).json({
      success: false,
      error: error.message,
      retryAfter: error.retryAfter
    });
  }
  
  if (error instanceof OTPNotFoundError || error instanceof OTPExpiredError) {
    return res.status(404).json({
      success: false,
      error: error.message
    });
  }
  
  if (error instanceof InvalidOTPError || error instanceof MaxAttemptsExceededError) {
    return res.status(401).json({
      success: false,
      error: error.message
    });
  }
  
  // Default error response
  res.status(500).json({
    success: false,
    error: 'Internal server error',
    message: process.env.NODE_ENV === 'development' ? error.message : undefined
  });
};`
    },
    types: {
      title: 'TypeScript Interfaces & Types',
      language: 'typescript',
      code: `// OTP Data Types
export interface OTPData {
  code: string;
  userId: string;
  channel: 'SMS' | 'EMAIL';
  destination: string;
  attempts: number;
  createdAt: number;
  expiresAt: number;
  metadata?: Record<string, any>;
}

export interface OTPResponse {
  success: boolean;
  message: string;
  expiresIn?: number;
  requestId?: string;
}

export interface VerifyResponse {
  success: boolean;
  token?: string;
  message: string;
}

// Error Types
export class OTPError extends Error {
  constructor(message: string, public code: string) {
    super(message);
    this.name = 'OTPError';
  }
}

export class RateLimitExceededError extends OTPError {
  constructor(message: string, public retryAfter: number = 3600) {
    super(message, 'RATE_LIMIT_EXCEEDED');
  }
}

export class OTPNotFoundError extends OTPError {
  constructor(message: string) {
    super(message, 'OTP_NOT_FOUND');
  }
}

export class OTPExpiredError extends OTPError {
  constructor(message: string) {
    super(message, 'OTP_EXPIRED');
  }
}

export class InvalidOTPError extends OTPError {
  constructor(message: string) {
    super(message, 'INVALID_OTP');
  }
}

export class MaxAttemptsExceededError extends OTPError {
  constructor(message: string) {
    super(message, 'MAX_ATTEMPTS_EXCEEDED');
  }
}

// Service Dependencies
export interface OTPServiceDeps {
  redis: Redis;
  rateLimiter: RateLimiter;
  notificationService: NotificationService;
  logger?: Logger;
}

// Configuration
export interface OTPConfig {
  otpLength: number;
  otpTTL: number;
  maxAttempts: number;
  rateLimit: {
    window: number;
    maxRequests: number;
  };
  resendCooldown: number;
  hashOTP: boolean;
}

// Notification Service Interface
export interface NotificationService {
  sendOTP(params: {
    channel: 'SMS' | 'EMAIL';
    destination: string;
    otp: string;
    userId: string;
  }): Promise<void>;
}

// Database Schema (PostgreSQL)
export const OTPAuditSchema = \`
CREATE TABLE otp_audit_logs (
  id SERIAL PRIMARY KEY,
  user_id VARCHAR(255) NOT NULL,
  destination VARCHAR(255) NOT NULL,
  channel VARCHAR(10) NOT NULL,
  event_type VARCHAR(50) NOT NULL,
  ip_address INET,
  user_agent TEXT,
  error_message TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  INDEX idx_user_id (user_id),
  INDEX idx_destination (destination),
  INDEX idx_created_at (created_at)
);

CREATE TABLE otp_stats (
  id SERIAL PRIMARY KEY,
  date DATE NOT NULL,
  total_generated INTEGER DEFAULT 0,
  total_verified INTEGER DEFAULT 0,
  total_failed INTEGER DEFAULT 0,
  total_expired INTEGER DEFAULT 0,
  UNIQUE KEY unique_date (date)
);
\`;`
    }
  }

  const currentCode = codeExamples[selectedTab]

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold mb-4">Implementation Details</h2>
        <p className="text-gray-300 text-lg">
          Production-ready OTP system implementation with TypeScript, focusing on 
          security, scalability, and maintainability.
        </p>
      </div>

      {/* Code Tabs */}
      <div className="flex gap-2 p-1 bg-white/10 rounded-lg">
        {Object.entries(codeExamples).map(([key, example]) => (
          <button
            key={key}
            onClick={() => setSelectedTab(key as keyof typeof codeExamples)}
            className={`flex-1 py-2 px-4 rounded-md font-medium transition-all ${
              selectedTab === key
                ? 'bg-blue-600 text-white'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            {example.title}
          </button>
        ))}
      </div>

      {/* Code Display */}
      <motion.div
        key={selectedTab}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-black/80 rounded-xl p-6 overflow-x-auto"
      >
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold flex items-center gap-2">
            <FileCode className="w-5 h-5 text-blue-400" />
            {currentCode.title}
          </h3>
          <span className="text-sm text-gray-400 font-mono">
            {currentCode.language}
          </span>
        </div>
        
        <pre className="text-sm">
          <code className="language-typescript text-gray-300">
            {currentCode.code}
          </code>
        </pre>
      </motion.div>

      {/* Implementation Checklist */}
      <div className="bg-gradient-to-r from-green-500/10 to-emerald-500/10 rounded-lg p-6 border border-green-500/20">
        <h3 className="text-xl font-semibold mb-4">Production Checklist</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-semibold text-green-400 mb-3">Must Have</h4>
            <ul className="space-y-2 text-sm text-gray-300">
              <li className="flex items-center gap-2">
                <Code className="w-4 h-4 text-green-400" />
                Rate limiting per user and IP
              </li>
              <li className="flex items-center gap-2">
                <Shield className="w-4 h-4 text-green-400" />
                Secure random number generation
              </li>
              <li className="flex items-center gap-2">
                <Database className="w-4 h-4 text-green-400" />
                Audit logging for compliance
              </li>
              <li className="flex items-center gap-2">
                <Code className="w-4 h-4 text-green-400" />
                Input validation and sanitization
              </li>
              <li className="flex items-center gap-2">
                <Shield className="w-4 h-4 text-green-400" />
                Error handling without info leakage
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold text-emerald-400 mb-3">Nice to Have</h4>
            <ul className="space-y-2 text-sm text-gray-300">
              <li className="flex items-center gap-2">
                <Code className="w-4 h-4 text-emerald-400" />
                Multiple delivery channels
              </li>
              <li className="flex items-center gap-2">
                <Database className="w-4 h-4 text-emerald-400" />
                Analytics and monitoring
              </li>
              <li className="flex items-center gap-2">
                <Shield className="w-4 h-4 text-emerald-400" />
                Fraud detection integration
              </li>
              <li className="flex items-center gap-2">
                <Code className="w-4 h-4 text-emerald-400" />
                A/B testing for OTP formats
              </li>
              <li className="flex items-center gap-2">
                <Database className="w-4 h-4 text-emerald-400" />
                Backup delivery mechanisms
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
