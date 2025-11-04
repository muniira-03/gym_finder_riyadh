"""add_email_verified_field

Revision ID: add_email_verified_field
Revises: 54abd3764e63
Create Date: 2024-01-01 00:00:00.000000

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'add_email_verified_field'
down_revision = '54abd3764e63'
branch_labels = None
depends_on = None


def upgrade() -> None:
    # Add email_verified column to users table
    op.add_column('users', sa.Column('email_verified', sa.String(length=10), nullable=False, server_default='false'))


def downgrade() -> None:
    # Remove email_verified column from users table
    op.drop_column('users', 'email_verified')

