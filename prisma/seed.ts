import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const SALT_ROUNDS = 10;
const prisma = new PrismaClient();

async function main() {

	const users   = await prisma.user.findMany();
	const servers = await prisma.server.findMany();
	const subnets = await prisma.subnet.findMany();
	const devices = await prisma.device.findMany();

	const admin = await prisma.user.create({
		data: {
			fullname: 'Administrator',
			username: 'admin',
			email: '',
			isActive: true,
			isAdmin: true,
			password: await bcrypt.hash('admin', SALT_ROUNDS)
		}
	});

	const server1 = await prisma.server.create({
		data: {
			name: 'Proxy DC7',
			hostname: 'https://ipdog-api.smes24.com',
			description: 'Proxy server DC7',
			username: 'user1',
			password: 'passwd1',
			subnets: {
				create: [
					{
						subnet: '172.16.24.0/24',
						description: 'Production subnet',
						devices: {
							create: [
								{
									address: '172.16.24.1',
									hostname: 'gw.test1.com',
									description: 'Router Gateway'
								},
								{
									address: '172.16.24.10',
									hostname: 'pc10.test1.com',
									description: 'Asus notebook'
								},
								{
									address: '172.16.24.11',
									hostname: 'pc11.test1.com',
									description: 'Dell PC'
								},
								{
									address: '172.16.24.20',
									hostname: 'host20.test1.com',
									description: 'Server Host 20'
								}
							]
						}
					}
				]
			}
		}
	});

	const server2 = await prisma.server.create({
		data: {
			name: 'Proxy HQ',
			hostname: 'https://ipdog-api-hq.smes24.com',
			description: 'Proxy server HQ',
			username: 'user2',
			password: 'passwd2',
			subnets: {
				create: [
					{
						subnet: '192.168.100.0/24',
						description: 'Production subnet',
						devices: {
							create: [
								{
									address: '192.168.100.1',
									hostname: 'gw.test2.com',
									description: 'Router Gateway'
								},
								{
									address: '192.168.100.10',
									hostname: 'pc10.test2.com',
									description: 'Asus notebook'
								},
								{
									address: '192.168.100.11',
									hostname: 'pc11.test2.com',
									description: 'Dell PC'
								},
								{
									address: '192.168.100.20',
									hostname: 'host20.test2.com',
									description: 'Server Host 20'
								}
							]
						}
					},
					{
						subnet: '192.168.11.0/24',
						description: 'Service subnet',
						devices: {
							create: [
								{
									address: '192.168.11.138',
									hostname: 'gw.test2.com',
									description: 'Router Gateway'
								},
								{
									address: '192.168.11.10',
									hostname: 'pc10.test2.com',
									description: 'Asus notebook'
								},
								{
									address: '192.168.11.11',
									hostname: 'pc11.test2.com',
									description: 'Dell PC'
								},
								{
									address: '192.168.11.20',
									hostname: 'host20.test2.com',
									description: 'Server Host 20'
								}
							]
						}
					}
				]
			}
		}
	});
  console.log(server1, server2, admin);
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
