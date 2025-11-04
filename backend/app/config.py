from pydantic_settings import BaseSettings
from pydantic import Field


class Settings(BaseSettings):
    DATABASE_URL: str = Field(
        default="sqlite:///./gym_finder.db",
        description="SQLAlchemy database URL; e.g., sqlite:///./app.db or mysql+pymysql://user:pass@host/db",
    )
    JWT_SECRET_KEY: str = Field(default="change_me", description="JWT secret key")
    JWT_ALGORITHM: str = Field(default="HS256", description="JWT signing algorithm")
    ACCESS_TOKEN_EXPIRE_MINUTES: int = Field(default=60 * 24, description="Access token expiry in minutes")
    
    # Redis settings
    REDIS_URL: str = Field(default="redis://localhost:6379", description="Redis connection URL")
    
    # Email settings (for OTP) - Mailtrap for development
    SMTP_HOST: str = Field(default="smtp.mailtrap.io", description="SMTP host for sending emails")
    SMTP_PORT: int = Field(default=2525, description="SMTP port")
    SMTP_USERNAME: str = Field(default="", description="SMTP username")
    SMTP_PASSWORD: str = Field(default="", description="SMTP password")
    FROM_EMAIL: str = Field(default="noreply@gymfinder.com", description="From email address")
    
    # Alternative environment variable names for Mailtrap
    MAIL_HOST: str = Field(default="smtp.mailtrap.io", description="Mail host (alternative)")
    MAIL_PORT: int = Field(default=2525, description="Mail port (alternative)")
    MAIL_USER: str = Field(default="", description="Mail user (alternative)")
    MAIL_PASS: str = Field(default="", description="Mail pass (alternative)")

    class Config:
        env_file = ".env"
        case_sensitive = False


settings = Settings()

