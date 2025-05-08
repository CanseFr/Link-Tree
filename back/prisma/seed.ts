import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();
const roundsOfHashing = 10;

async function main() {
  const password_admin_1 = await bcrypt.hash(
    'adminadminadmin',
    roundsOfHashing,
  );
  const password_user_1 = await bcrypt.hash('useruseruser', roundsOfHashing);

  const user_admin_1 = await prisma.user.upsert({
    where: { email: 'admin@admin.admin' },
    update: {
      password: password_admin_1,
    },
    create: {
      firstname: 'Admin',
      lastname: 'ADMINLAST',
      role: 'ADMIN',
      email: 'admin@admin.admin',
      password: password_admin_1,
      path: {
        create: {
          url_owner: '/urluser1',
          bgColor: 'white',
          bio: "Je suis la bio de l'utilisateur admin et voila voila",
          branchs: {
            create: [
              {
                name_network: 'Soudcloud',
                url_network: 'http://soundcloud.fr',
              },
              {
                name_network: 'Youporn',
                url_network: 'http://youporn.fr',
              },
              {
                name_network: 'Prisma',
                url_network: 'http://prisma.fr',
              },
            ],
          },
        },
      },
    },
  });

  const user_user_1 = await prisma.user.upsert({
    where: { email: 'User@User.User' },
    update: {
      password: password_user_1,
    },
    create: {
      firstname: 'User',
      lastname: 'USERLAST',
      role: 'USER',
      email: 'User@User.User',
      password: password_user_1,
      path: {
        create: {
          url_owner: '/urladmin1',
          bio: "Je suis la bio de l'utilisateur user et voila voila",
          bgColor: 'blue',
          branchs: {
            create: [
              {
                name_network: 'Instagram',
                url_network: 'http://insta.fr',
              },
              {
                name_network: 'Facebook',
                url_network: 'http://facebook.fr',
              },
              {
                name_network: 'Tweeter',
                url_network: 'http://tweeter.fr',
              },
            ],
          },
        },
      },
    },
  });

  const user_user_blank = await prisma.user.upsert({
    where: { email: 'User@blank.User' },
    update: {
      password: password_user_1,
    },
    create: {
      firstname: 'User',
      lastname: 'USERBLANK',
      role: 'USER',
      email: 'User@blank.User',
      password: password_user_1,
    },
  });

  console.log(user_admin_1, user_user_1, user_user_blank);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
