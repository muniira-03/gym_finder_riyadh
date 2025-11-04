from datetime import datetime
from sqlalchemy import Column, Integer, String, ForeignKey, DateTime, Float, Text, Enum
from sqlalchemy.orm import relationship
from .database import Base
import enum


class UserRole(str, enum.Enum):
    user = "user"
    admin = "admin"


class SuggestionStatus(str, enum.Enum):
    pending = "pending"
    approved = "approved"
    rejected = "rejected"


class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(255), nullable=False)
    email = Column(String(255), unique=True, index=True, nullable=False)
    password = Column(String(255), nullable=False)
    email_verified = Column(String(10), default="false", nullable=False)  # "true" or "false"
    role = Column(Enum(UserRole), default=UserRole.user, nullable=False)
    created_at = Column(DateTime, default=datetime.utcnow, nullable=False)

    gyms = relationship("Gym", back_populates="added_by_user")
    suggestions = relationship("GymSuggestion", back_populates="user")
    messages = relationship("ContactMessage", back_populates="user")


class Gym(Base):
    __tablename__ = "gyms"

    id = Column(Integer, primary_key=True, index=True)
    name_ar = Column(String(255), nullable=False)
    name_en = Column(String(255), nullable=False)
    location = Column(String(255), nullable=False)
    description = Column(Text)
    phone = Column(String(50))
    website = Column(String(255))
    rating = Column(Float)
    opening_hours = Column(String(255))
    facilities = Column(Text)
    equipment = Column(Text)
    added_by = Column(Integer, ForeignKey("users.id"), nullable=False)
    created_at = Column(DateTime, default=datetime.utcnow, nullable=False)

    added_by_user = relationship("User", back_populates="gyms")


class GymSuggestion(Base):
    __tablename__ = "gym_suggestions"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    gym_name = Column(String(255), nullable=False)
    location = Column(String(255), nullable=False)
    notes = Column(Text)
    status = Column(Enum(SuggestionStatus), default=SuggestionStatus.pending, nullable=False)
    created_at = Column(DateTime, default=datetime.utcnow, nullable=False)

    user = relationship("User", back_populates="suggestions")


class ContactMessage(Base):
    __tablename__ = "contact_messages"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=True)
    name = Column(String(255), nullable=False)
    email = Column(String(255), nullable=False)
    message = Column(Text, nullable=False)
    created_at = Column(DateTime, default=datetime.utcnow, nullable=False)

    user = relationship("User", back_populates="messages")

