import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  // Create sample user
  const hashedPassword = await bcrypt.hash('password123', 10);

  const user = await prisma.user.upsert({
    where: { email: 'test@example.com' },
    update: {},
    create: {
      email: 'test@example.com',
      name: 'Test User',
      password: hashedPassword,
    },
  });

  // Create sample categories
  const categoryNames = [
    { name: 'Food & Groceries', icon: '🛒', color: '#FF6B6B' },
    { name: 'Transportation', icon: '🚗', color: '#4ECDC4' },
    { name: 'Entertainment', icon: '🎬', color: '#FFE66D' },
    { name: 'Utilities', icon: '💡', color: '#95E1D3' },
    { name: 'Healthcare', icon: '🏥', color: '#FF6B9D' },
  ];

  for (const categoryData of categoryNames) {
    await prisma.budgetCategory.upsert({
      where: {
        userId_name: {
          userId: user.id,
          name: categoryData.name,
        },
      },
      update: {},
      create: {
        ...categoryData,
        userId: user.id,
      },
    });
  }

  console.log('✅ Seed data created successfully!');
  console.log(`📧 User: ${user.email}`);
  console.log(`🔑 Password: password123`);
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
