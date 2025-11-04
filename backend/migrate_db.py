#!/usr/bin/env python3
"""
Simple database migration script to add email_verified column
"""

import sqlite3
import os

def migrate_database():
    """Add email_verified column to users table"""
    db_path = "gym_finder.db"
    
    if not os.path.exists(db_path):
        print("Database file not found!")
        return False
    
    try:
        conn = sqlite3.connect(db_path)
        cursor = conn.cursor()
        
        # Check if email_verified column already exists
        cursor.execute("PRAGMA table_info(users)")
        columns = [column[1] for column in cursor.fetchall()]
        
        if 'email_verified' in columns:
            print("email_verified column already exists")
            return True
        
        # Add email_verified column
        cursor.execute("ALTER TABLE users ADD COLUMN email_verified VARCHAR(10) DEFAULT 'false'")
        
        # Update existing users to have email_verified = 'true' (for backward compatibility)
        cursor.execute("UPDATE users SET email_verified = 'true' WHERE email_verified IS NULL OR email_verified = ''")
        
        conn.commit()
        conn.close()
        
        print("Successfully added email_verified column to users table")
        return True
        
    except Exception as e:
        print(f"Migration failed: {e}")
        return False

if __name__ == "__main__":
    print("Running database migration...")
    migrate_database()
