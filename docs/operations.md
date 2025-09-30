# Farm360 Operations Guide

This document provides essential information for operating and maintaining the Farm360 application in production.

## Database Management

### Backups

The PostgreSQL database on Railway is automatically backed up daily. However, it's recommended to set up additional backup procedures:

1. **Scheduled Backups**:
   ```bash
   # Run this command weekly (can be scheduled with cron)
   pg_dump -h $DB_HOST -U $DB_USER -d $DB_NAME -F c -f farm360_backup_$(date +%Y%m%d).dump
   ```

2. **Store Backups Securely**:
   - Upload backups to secure cloud storage (AWS S3, Google Cloud Storage)
   - Retain at least 30 days of backups
   - Test backup integrity monthly

### Restores

To restore from a backup:

1. **Full Database Restore**:
   ```bash
   pg_restore -h $DB_HOST -U $DB_USER -d $DB_NAME -c -v farm360_backup_YYYYMMDD.dump
   ```

2. **Partial Restore** (specific tables):
   ```bash
   pg_restore -h $DB_HOST -U $DB_USER -d $DB_NAME -c -v -t table_name farm360_backup_YYYYMMDD.dump
   ```

## Database Migrations

Migrations are managed through the `backend/db/migrations` directory:

1. **Creating New Migrations**:
   - Create a new SQL file in the migrations directory with a sequential number prefix
   - Example: `003_add_new_feature.sql`

2. **Running Migrations**:
   ```bash
   # Development
   cd backend && node db/migrations/run.js
   
   # Production (via Railway CLI)
   railway run node db/migrations/run.js
   ```

3. **Migration Best Practices**:
   - Always make migrations reversible when possible
   - Include comments explaining complex changes
   - Test migrations in development before applying to production

## Monitoring and Logging

1. **Application Logs**:
   - Access logs via Railway dashboard
   - Set up log forwarding to a centralized logging service

2. **Performance Monitoring**:
   - Monitor API response times
   - Track database query performance
   - Set up alerts for unusual patterns

## Security Procedures

1. **JWT Token Management**:
   - Rotate JWT_SECRET periodically (at least quarterly)
   - Update through Railway environment variables

2. **Database Credentials**:
   - Rotate database credentials quarterly
   - Update through Railway environment variables

3. **Security Audits**:
   - Conduct monthly dependency vulnerability scans
   - Run quarterly security reviews of application code

## Deployment Procedures

### Backend (Railway)

1. **Standard Deployment**:
   - Merging to main branch triggers automatic deployment
   - Monitor deployment in GitHub Actions and Railway dashboard

2. **Manual Deployment**:
   ```bash
   railway up
   ```

3. **Rollback Procedure**:
   - Via Railway dashboard, select previous deployment
   - Or via CLI: `railway rollback`

### Frontend (Vercel)

1. **Standard Deployment**:
   - Merging to main branch triggers automatic deployment
   - Monitor deployment in Vercel dashboard

2. **Manual Deployment**:
   ```bash
   vercel --prod
   ```

3. **Rollback Procedure**:
   - Via Vercel dashboard, select previous deployment
   - Or via CLI: `vercel rollback`

## Troubleshooting

### Common Issues

1. **Database Connection Issues**:
   - Check network connectivity
   - Verify credentials in environment variables
   - Ensure database service is running

2. **API Errors**:
   - Check application logs for error details
   - Verify JWT token validity
   - Check for recent code changes that might affect endpoints

3. **Frontend Issues**:
   - Clear browser cache
   - Check browser console for JavaScript errors
   - Verify API endpoint configuration

## Contact Information

For urgent production issues, contact:
- Primary: [Your Name] - [Your Email]
- Secondary: [Backup Contact] - [Backup Email]