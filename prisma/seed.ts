import { PrismaClient, PropertyType, ListingType, PropertyStatus, Category, ItemCondition } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting seed...');

  // Clean up existing data
  await prisma.message.deleteMany();
  await prisma.favorite.deleteMany();
  await prisma.propertyImage.deleteMany();
  await prisma.property.deleteMany();
  await prisma.account.deleteMany();
  await prisma.session.deleteMany();
  await prisma.verificationToken.deleteMany();
  await prisma.user.deleteMany();

  console.log('✅ Cleaned up existing data');

  // Create users
  const hashedPassword = await bcrypt.hash('password123', 12);

  const user1 = await prisma.user.create({
    data: {
      email: 'nguyen.van.a@email.com',
      name: 'Nguyễn Văn A',
      phone: '0901234567',
      password: hashedPassword,
      image: 'https://i.pravatar.cc/150?u=nguyen.van.a',
    },
  });

  const user2 = await prisma.user.create({
    data: {
      email: 'tran.thi.b@email.com',
      name: 'Trần Thị B',
      phone: '0912345678',
      password: hashedPassword,
      image: 'https://i.pravatar.cc/150?u=tran.thi.b',
    },
  });

  const user3 = await prisma.user.create({
    data: {
      email: 'le.van.c@email.com',
      name: 'Lê Văn C',
      phone: '0923456789',
      password: hashedPassword,
      image: 'https://i.pravatar.cc/150?u=le.van.c',
    },
  });

  console.log('✅ Created 3 users');

  // Sample property data
  const properties = [
    // Apartments in HCM
    {
      title: 'Căn hộ cao cấp Vinhomes Central Park 3PN',
      description: 'Căn hộ cao cấp 3 phòng ngủ, 2 phòng tắm tại Vinhomes Central Park. View sông Sài Gòn, nội thất đầy đủ cao cấp, tiện ích đẳng cấp 5 sao. Gần trung tâm thương mại Landmark 81, hồ bơi, gym, công viên.',
      propertyType: PropertyType.APARTMENT,
      listingType: ListingType.SALE,
      price: 8500000000,
      area: 120,
      bedrooms: 3,
      bathrooms: 2,
      address: '208 Nguyễn Hữu Cảnh',
      ward: 'Phường 22',
      district: 'Quận Bình Thạnh',
      city: 'TP. Hồ Chí Minh',
      latitude: 10.7948,
      longitude: 106.7218,
      userId: user1.id,
      images: [
        'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800',
        'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800',
        'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800',
      ],
    },
    {
      title: 'Cho thuê căn hộ Masteri Thảo Điền 2PN',
      description: 'Căn hộ 2 phòng ngủ cho thuê tại Masteri Thảo Điền. Full nội thất hiện đại, view hồ bơi, gần Metro, trung tâm thương mại. Giá thuê bao gồm phí quản lý.',
      propertyType: PropertyType.APARTMENT,
      listingType: ListingType.RENT,
      price: 25000000,
      area: 75,
      bedrooms: 2,
      bathrooms: 2,
      address: '159 Xa Lộ Hà Nội',
      ward: 'Phường Thảo Điền',
      district: 'Quận 2',
      city: 'TP. Hồ Chí Minh',
      latitude: 10.8024,
      longitude: 106.7391,
      userId: user2.id,
      images: [
        'https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=800',
        'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800',
      ],
    },
    {
      title: 'Căn hộ The Manor 1PN giá tốt',
      description: 'Căn hộ 1 phòng ngủ tại The Manor Bình Thạnh. Nội thất cơ bản, view thành phố, gần các tiện ích công cộng. Phù hợp cho người độc thân hoặc vợ chồng trẻ.',
      propertyType: PropertyType.APARTMENT,
      listingType: ListingType.SALE,
      price: 3200000000,
      area: 52,
      bedrooms: 1,
      bathrooms: 1,
      address: '91 Nguyễn Hữu Cảnh',
      ward: 'Phường 22',
      district: 'Quận Bình Thạnh',
      city: 'TP. Hồ Chí Minh',
      latitude: 10.7903,
      longitude: 106.7135,
      userId: user1.id,
      images: [
        'https://images.unsplash.com/photo-1536376072261-38c75010e6c9?w=800',
      ],
    },
    // Houses
    {
      title: 'Nhà phố Quận 7 mặt tiền đường lớn',
      description: 'Nhà phố 4 tầng mặt tiền đường Nguyễn Thị Thập, Quận 7. Diện tích 5x20m, 4 phòng ngủ, 5 phòng tắm. Vị trí kinh doanh sầm uất, gần Lotte Mart, SC VivoCity.',
      propertyType: PropertyType.HOUSE,
      listingType: ListingType.SALE,
      price: 18000000000,
      area: 100,
      bedrooms: 4,
      bathrooms: 5,
      address: '123 Nguyễn Thị Thập',
      ward: 'Phường Tân Quy',
      district: 'Quận 7',
      city: 'TP. Hồ Chí Minh',
      latitude: 10.7380,
      longitude: 106.7003,
      userId: user3.id,
      images: [
        'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800',
        'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800',
        'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800',
      ],
    },
    {
      title: 'Cho thuê nhà nguyên căn Quận 3',
      description: 'Nhà nguyên căn 3 tầng cho thuê tại Quận 3. 3 phòng ngủ, 2 phòng tắm, sân thượng rộng. Gần chợ Tân Định, thuận tiện đi lại.',
      propertyType: PropertyType.HOUSE,
      listingType: ListingType.RENT,
      price: 35000000,
      area: 80,
      bedrooms: 3,
      bathrooms: 2,
      address: '45 Trần Quang Diệu',
      ward: 'Phường 14',
      district: 'Quận 3',
      city: 'TP. Hồ Chí Minh',
      latitude: 10.7831,
      longitude: 106.6818,
      userId: user2.id,
      images: [
        'https://images.unsplash.com/photo-1572120360610-d971b9d7767c?w=800',
        'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=800',
      ],
    },
    // Villas
    {
      title: 'Biệt thự nghỉ dưỡng Thảo Điền',
      description: 'Biệt thự compound an ninh 24/7 tại Thảo Điền. 5 phòng ngủ, hồ bơi riêng, sân vườn rộng 500m2. Nội thất nhập khẩu châu Âu, phong cách hiện đại.',
      propertyType: PropertyType.VILLA,
      listingType: ListingType.SALE,
      price: 45000000000,
      area: 500,
      bedrooms: 5,
      bathrooms: 6,
      address: '18 Đường Số 10',
      ward: 'Phường Thảo Điền',
      district: 'Quận 2',
      city: 'TP. Hồ Chí Minh',
      latitude: 10.8056,
      longitude: 106.7352,
      userId: user1.id,
      images: [
        'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800',
        'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800',
        'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800',
      ],
    },
    {
      title: 'Villa cho thuê dài hạn Quận 2',
      description: 'Villa 4 phòng ngủ cho thuê dài hạn tại compound An Phú. Hồ bơi chung, bảo vệ 24/7, gần trường quốc tế.',
      propertyType: PropertyType.VILLA,
      listingType: ListingType.RENT,
      price: 80000000,
      area: 350,
      bedrooms: 4,
      bathrooms: 4,
      address: '99 Nguyễn Văn Hưởng',
      ward: 'Phường An Phú',
      district: 'Quận 2',
      city: 'TP. Hồ Chí Minh',
      latitude: 10.7934,
      longitude: 106.7445,
      userId: user3.id,
      images: [
        'https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=800',
        'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800',
      ],
    },
    // Land
    {
      title: 'Đất nền dự án Quận 9 giá rẻ',
      description: 'Đất nền dự án tại Quận 9, diện tích 100m2, sổ hồng riêng, hạ tầng hoàn thiện. Gần đường Lê Văn Việt, tiện ích đầy đủ.',
      propertyType: PropertyType.LAND,
      listingType: ListingType.SALE,
      price: 3500000000,
      area: 100,
      address: 'Đường số 8, KDC Tân Phú',
      ward: 'Phường Tân Phú',
      district: 'Quận 9',
      city: 'TP. Hồ Chí Minh',
      latitude: 10.8432,
      longitude: 106.8102,
      userId: user2.id,
      images: [
        'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800',
      ],
    },
    // Office
    {
      title: 'Văn phòng cho thuê Quận 1 view đẹp',
      description: 'Văn phòng hạng A cho thuê tại tòa nhà Bitexco. View toàn thành phố, nội thất văn phòng cao cấp, hệ thống điều hòa trung tâm.',
      propertyType: PropertyType.OFFICE,
      listingType: ListingType.RENT,
      price: 150000000,
      area: 200,
      address: '2 Hải Triều',
      ward: 'Phường Bến Nghé',
      district: 'Quận 1',
      city: 'TP. Hồ Chí Minh',
      latitude: 10.7716,
      longitude: 106.7044,
      userId: user1.id,
      images: [
        'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800',
        'https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=800',
      ],
    },
    // Shophouse
    {
      title: 'Shophouse Phú Mỹ Hưng vị trí đắc địa',
      description: 'Shophouse 2 mặt tiền tại Phú Mỹ Hưng. 3 tầng, diện tích 150m2, phù hợp kinh doanh café, nhà hàng, showroom.',
      propertyType: PropertyType.SHOPHOUSE,
      listingType: ListingType.SALE,
      price: 28000000000,
      area: 150,
      bedrooms: 2,
      bathrooms: 3,
      address: '88 Nguyễn Đức Cảnh',
      ward: 'Phường Tân Phong',
      district: 'Quận 7',
      city: 'TP. Hồ Chí Minh',
      latitude: 10.7292,
      longitude: 106.7195,
      userId: user3.id,
      images: [
        'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800',
        'https://images.unsplash.com/photo-1528698827591-e19ccd7bc23d?w=800',
      ],
    },
    // Hanoi properties
    {
      title: 'Căn hộ Times City Park Hill 2PN',
      description: 'Căn hộ 2 phòng ngủ tại Times City Park Hill. Full nội thất, view công viên, tiện ích đầy đủ: hồ bơi, gym, siêu thị, rạp chiếu phim.',
      propertyType: PropertyType.APARTMENT,
      listingType: ListingType.SALE,
      price: 4200000000,
      area: 85,
      bedrooms: 2,
      bathrooms: 2,
      address: '458 Minh Khai',
      ward: 'Phường Vĩnh Tuy',
      district: 'Quận Hai Bà Trưng',
      city: 'Hà Nội',
      latitude: 20.9948,
      longitude: 105.8673,
      userId: user1.id,
      images: [
        'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800',
        'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800',
      ],
    },
    {
      title: 'Cho thuê căn hộ Vinhomes Skylake 3PN',
      description: 'Căn hộ 3 phòng ngủ tại Vinhomes Skylake Phạm Hùng. Nội thất cao cấp, view hồ điều hòa, gần công viên Cầu Giấy.',
      propertyType: PropertyType.APARTMENT,
      listingType: ListingType.RENT,
      price: 30000000,
      area: 110,
      bedrooms: 3,
      bathrooms: 2,
      address: '1 Phạm Hùng',
      ward: 'Phường Mễ Trì',
      district: 'Quận Nam Từ Liêm',
      city: 'Hà Nội',
      latitude: 21.0167,
      longitude: 105.7833,
      userId: user2.id,
      images: [
        'https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=800',
        'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800',
      ],
    },
    {
      title: 'Nhà phố cổ Hoàn Kiếm',
      description: 'Nhà phố cổ 3 tầng tại phố Hàng Bạc. Diện tích 40m2, mặt tiền 4m. Vị trí trung tâm, phù hợp kinh doanh du lịch, nhà hàng.',
      propertyType: PropertyType.HOUSE,
      listingType: ListingType.SALE,
      price: 15000000000,
      area: 40,
      bedrooms: 2,
      bathrooms: 2,
      address: '56 Hàng Bạc',
      ward: 'Phường Hàng Bạc',
      district: 'Quận Hoàn Kiếm',
      city: 'Hà Nội',
      latitude: 21.0317,
      longitude: 105.8524,
      userId: user3.id,
      images: [
        'https://images.unsplash.com/photo-1518780664697-55e3ad937233?w=800',
      ],
    },
    {
      title: 'Biệt thự Vinhomes Riverside Long Biên',
      description: 'Biệt thự đơn lập tại Vinhomes Riverside. 4 phòng ngủ, sân vườn rộng, hồ bơi riêng. An ninh 24/7, tiện ích đẳng cấp.',
      propertyType: PropertyType.VILLA,
      listingType: ListingType.SALE,
      price: 35000000000,
      area: 400,
      bedrooms: 4,
      bathrooms: 5,
      address: '9 Đường Hoa Lan',
      ward: 'Phường Việt Hưng',
      district: 'Quận Long Biên',
      city: 'Hà Nội',
      latitude: 21.0467,
      longitude: 105.9000,
      userId: user1.id,
      images: [
        'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800',
        'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800',
      ],
    },
    // Da Nang properties
    {
      title: 'Căn hộ view biển Đà Nẵng',
      description: 'Căn hộ 2 phòng ngủ view biển Mỹ Khê. Nội thất hiện đại, ban công rộng, cách biển 100m.',
      propertyType: PropertyType.APARTMENT,
      listingType: ListingType.SALE,
      price: 2800000000,
      area: 70,
      bedrooms: 2,
      bathrooms: 1,
      address: '180 Võ Nguyên Giáp',
      ward: 'Phường Phước Mỹ',
      district: 'Quận Sơn Trà',
      city: 'Đà Nẵng',
      latitude: 16.0544,
      longitude: 108.2472,
      userId: user2.id,
      images: [
        'https://images.unsplash.com/photo-1515263487990-61b07816b324?w=800',
        'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800',
      ],
    },
    {
      title: 'Villa biển Đà Nẵng cho thuê',
      description: 'Villa 6 phòng ngủ mặt biển Mỹ Khê cho thuê theo ngày/tháng. Hồ bơi riêng, BBQ, phù hợp nghỉ dưỡng gia đình.',
      propertyType: PropertyType.VILLA,
      listingType: ListingType.RENT,
      price: 15000000,
      area: 300,
      bedrooms: 6,
      bathrooms: 4,
      address: '88 Trường Sa',
      ward: 'Phường Hòa Hải',
      district: 'Quận Ngũ Hành Sơn',
      city: 'Đà Nẵng',
      latitude: 16.0234,
      longitude: 108.2589,
      userId: user3.id,
      images: [
        'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800',
        'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800',
        'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800',
      ],
    },
    // =================== VEHICLES ===================
    {
      title: 'Toyota Camry 2.5Q 2023 - Xe như mới',
      description: 'Toyota Camry 2.5Q đời 2023, đi 12.000km, màu đen, nội thất kem. Xe gia đình sử dụng kỹ, full option, camera 360, cốp điện. Bảo hành chính hãng đến 2026. Biển số thành phố.',
      category: Category.VEHICLES,
      listingType: ListingType.SALE,
      price: 1150000000,
      condition: ItemCondition.LIKE_NEW,
      brand: 'Toyota',
      model: 'Camry 2.5Q',
      yearMade: 2023,
      address: '123 Lý Thường Kiệt',
      ward: 'Phường 7',
      district: 'Quận 10',
      city: 'TP. Hồ Chí Minh',
      latitude: 10.7726,
      longitude: 106.6681,
      userId: user1.id,
      images: [
        'https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?w=800',
        'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=800',
      ],
    },
    {
      title: 'Honda Wave Alpha 110cc 2024 mới 100%',
      description: 'Honda Wave Alpha 110cc đời 2024, xe mới 100%, chưa đăng ký. Màu đen nhám, tiết kiệm xăng, bền bỉ. Bảo hành 3 năm chính hãng Honda.',
      category: Category.VEHICLES,
      listingType: ListingType.SALE,
      price: 18500000,
      condition: ItemCondition.NEW,
      brand: 'Honda',
      model: 'Wave Alpha 110cc',
      yearMade: 2024,
      address: '456 Cách Mạng Tháng 8',
      ward: 'Phường 11',
      district: 'Quận 3',
      city: 'TP. Hồ Chí Minh',
      latitude: 10.7812,
      longitude: 106.6862,
      userId: user2.id,
      images: [
        'https://images.unsplash.com/photo-1558981806-ec527fa84c39?w=800',
      ],
    },
    {
      title: 'Cho thuê xe Mercedes S450 tự lái',
      description: 'Cho thuê xe Mercedes S450 Luxury đời 2022 tự lái. Xe mới, nội thất đẹp, phù hợp đám cưới, sự kiện, công tác. Giá thuê theo ngày, có tài xế nếu cần.',
      category: Category.VEHICLES,
      listingType: ListingType.RENT,
      price: 5000000,
      condition: ItemCondition.LIKE_NEW,
      brand: 'Mercedes-Benz',
      model: 'S450 Luxury',
      yearMade: 2022,
      address: '78 Nguyễn Văn Trỗi',
      ward: 'Phường 8',
      district: 'Quận Phú Nhuận',
      city: 'TP. Hồ Chí Minh',
      latitude: 10.7991,
      longitude: 106.6780,
      userId: user3.id,
      images: [
        'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=800',
        'https://images.unsplash.com/photo-1563720223185-11003d516935?w=800',
      ],
    },
    // =================== ELECTRONICS ===================
    {
      title: 'MacBook Pro M3 Pro 14 inch - Fullbox',
      description: 'MacBook Pro 14 inch chip M3 Pro, RAM 18GB, SSD 512GB. Mua tháng 1/2024, còn bảo hành Apple đến 01/2025. Fullbox, sạc 3 lần. Lý do bán: được công ty cấp máy mới.',
      category: Category.ELECTRONICS,
      listingType: ListingType.SALE,
      price: 42000000,
      condition: ItemCondition.LIKE_NEW,
      brand: 'Apple',
      model: 'MacBook Pro 14 M3 Pro',
      yearMade: 2024,
      address: '15 Lê Lợi',
      ward: 'Phường Bến Thành',
      district: 'Quận 1',
      city: 'TP. Hồ Chí Minh',
      latitude: 10.7728,
      longitude: 106.6981,
      userId: user1.id,
      images: [
        'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=800',
        'https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?w=800',
      ],
    },
    {
      title: 'iPhone 15 Pro Max 256GB - Titan Tự Nhiên',
      description: 'iPhone 15 Pro Max 256GB màu Titan Tự Nhiên. Pin 98%, không trầy xước, đầy đủ phụ kiện. Mua tại TGDĐ, còn bảo hành đến tháng 9/2025.',
      category: Category.ELECTRONICS,
      listingType: ListingType.SALE,
      price: 28000000,
      condition: ItemCondition.GOOD,
      brand: 'Apple',
      model: 'iPhone 15 Pro Max 256GB',
      yearMade: 2024,
      address: '200 Trần Hưng Đạo',
      ward: 'Phường 10',
      district: 'Quận 5',
      city: 'TP. Hồ Chí Minh',
      latitude: 10.7545,
      longitude: 106.6735,
      userId: user2.id,
      images: [
        'https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=800',
      ],
    },
    {
      title: 'Cho thuê máy chiếu Epson EB-X51',
      description: 'Cho thuê máy chiếu Epson EB-X51, độ sáng 3800 lumens. Phù hợp hội thảo, tiệc cưới, sự kiện. Giá thuê theo ngày, có giao nhận tận nơi.',
      category: Category.ELECTRONICS,
      listingType: ListingType.RENT,
      price: 500000,
      condition: ItemCondition.GOOD,
      brand: 'Epson',
      model: 'EB-X51',
      yearMade: 2023,
      address: '55 Hai Bà Trưng',
      ward: 'Phường Bến Nghé',
      district: 'Quận 1',
      city: 'TP. Hồ Chí Minh',
      latitude: 10.7756,
      longitude: 106.7003,
      userId: user3.id,
      images: [
        'https://images.unsplash.com/photo-1478720568477-152d9b164e26?w=800',
      ],
    },
    // =================== FASHION ===================
    {
      title: 'Túi Louis Vuitton Neverfull MM chính hãng',
      description: 'Túi LV Neverfull MM Monogram chính hãng, mua tại store LV Đồng Khởi. Có bill, hộp, túi giấy đầy đủ. Sử dụng 5 lần, như mới. Lý do bán: được tặng túi khác.',
      category: Category.FASHION,
      listingType: ListingType.SALE,
      price: 28000000,
      condition: ItemCondition.LIKE_NEW,
      brand: 'Louis Vuitton',
      model: 'Neverfull MM Monogram',
      address: '92 Nam Kỳ Khởi Nghĩa',
      ward: 'Phường Bến Nghé',
      district: 'Quận 1',
      city: 'TP. Hồ Chí Minh',
      latitude: 10.7770,
      longitude: 106.6989,
      userId: user1.id,
      images: [
        'https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=800',
      ],
    },
    {
      title: 'Đồng hồ Rolex Datejust 41 - Like new',
      description: 'Rolex Datejust 41mm ref. 126334, mặt xanh, dây Jubilee. Fullset box + giấy tờ, mua 2023 tại AD authorized. Tình trạng 98%, chỉ đeo vài lần.',
      category: Category.FASHION,
      listingType: ListingType.SALE,
      price: 280000000,
      condition: ItemCondition.LIKE_NEW,
      brand: 'Rolex',
      model: 'Datejust 41 126334',
      yearMade: 2023,
      address: '45 Đồng Khởi',
      ward: 'Phường Bến Nghé',
      district: 'Quận 1',
      city: 'TP. Hồ Chí Minh',
      latitude: 10.7764,
      longitude: 106.7014,
      userId: user2.id,
      images: [
        'https://images.unsplash.com/photo-1523170335258-f5ed11844a49?w=800',
      ],
    },
    // =================== HOME & GARDEN ===================
    {
      title: 'Sofa góc L da Ý nhập khẩu - mới 100%',
      description: 'Sofa góc chữ L bọc da Ý cao cấp, khung gỗ sồi, đệm foam density cao. Kích thước 2.8m x 1.8m. Mới 100%, bảo hành 5 năm khung gỗ, 2 năm da.',
      category: Category.HOME_GARDEN,
      listingType: ListingType.SALE,
      price: 45000000,
      condition: ItemCondition.NEW,
      brand: 'Hòa Phát Premium',
      model: 'Sofa L Da Ý',
      address: '120 Nguyễn Thị Minh Khai',
      ward: 'Phường 6',
      district: 'Quận 3',
      city: 'TP. Hồ Chí Minh',
      latitude: 10.7832,
      longitude: 106.6890,
      userId: user3.id,
      images: [
        'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800',
        'https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?w=800',
      ],
    },
    {
      title: 'Máy lọc không khí Dyson Pure Cool TP07',
      description: 'Máy lọc không khí kiêm quạt Dyson Pure Cool TP07. Lọc HEPA H13, khử formaldehyde. Mua 6 tháng, còn bảo hành 1.5 năm. Lý do bán: chuyển nhà nhỏ hơn.',
      category: Category.HOME_GARDEN,
      listingType: ListingType.SALE,
      price: 12000000,
      condition: ItemCondition.LIKE_NEW,
      brand: 'Dyson',
      model: 'Pure Cool TP07',
      yearMade: 2024,
      address: '88 Lê Thánh Tôn',
      ward: 'Phường Bến Thành',
      district: 'Quận 1',
      city: 'TP. Hồ Chí Minh',
      latitude: 10.7740,
      longitude: 106.6994,
      userId: user1.id,
      images: [
        'https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=800',
      ],
    },
    // =================== SPORTS ===================
    {
      title: 'Xe đạp Trek Domane SL5 2024 - Mới 100%',
      description: 'Xe đạp đua Trek Domane SL5 đời 2024. Khung carbon OCLV 300, groupset Shimano 105 Di2. Mới 100%, chưa sử dụng. Lý do bán: đổi sang size khác.',
      category: Category.SPORTS,
      listingType: ListingType.SALE,
      price: 65000000,
      condition: ItemCondition.NEW,
      brand: 'Trek',
      model: 'Domane SL5 2024',
      yearMade: 2024,
      address: '30 Trần Quốc Toản',
      ward: 'Phường 8',
      district: 'Quận 3',
      city: 'TP. Hồ Chí Minh',
      latitude: 10.7820,
      longitude: 106.6895,
      userId: user2.id,
      images: [
        'https://images.unsplash.com/photo-1485965120184-e220f721d03e?w=800',
      ],
    },
    {
      title: 'Cho thuê sân bóng đá mini cỏ nhân tạo',
      description: 'Cho thuê sân bóng đá mini 5-7 người, cỏ nhân tạo thế hệ mới. Có đèn chiếu sáng, phòng thay đồ, bãi giữ xe. Giá thuê theo giờ, ưu đãi khung giờ sáng.',
      category: Category.SPORTS,
      listingType: ListingType.RENT,
      price: 400000,
      address: '250 Điện Biên Phủ',
      ward: 'Phường 7',
      district: 'Quận Bình Thạnh',
      city: 'TP. Hồ Chí Minh',
      latitude: 10.7980,
      longitude: 106.7102,
      userId: user3.id,
      images: [
        'https://images.unsplash.com/photo-1529900748604-07564a03e7a6?w=800',
      ],
    },
    // =================== JOBS ===================
    {
      title: 'Tuyển lập trình viên React/Next.js - Lương cao',
      description: 'Công ty công nghệ tuyển dụng lập trình viên Frontend React/Next.js. Yêu cầu: 2+ năm kinh nghiệm, TypeScript. Lương 20-35 triệu, thưởng KPI, bảo hiểm đầy đủ. Làm việc hybrid.',
      category: Category.JOBS,
      listingType: ListingType.SALE,
      price: 35000000,
      address: 'Tòa nhà Landmark 81',
      ward: 'Phường 22',
      district: 'Quận Bình Thạnh',
      city: 'TP. Hồ Chí Minh',
      latitude: 10.7948,
      longitude: 106.7218,
      userId: user1.id,
      images: [
        'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800',
      ],
    },
    // =================== SERVICES ===================
    {
      title: 'Dịch vụ chuyển nhà trọn gói Sài Gòn',
      description: 'Dịch vụ chuyển nhà trọn gói: đóng gói, vận chuyển, bốc dỡ, lắp đặt. Xe tải đủ loại từ 1-10 tấn. Giá rẻ, nhanh chóng, bảo hiểm hàng hóa. Phục vụ 24/7 toàn TP.HCM.',
      category: Category.SERVICES,
      listingType: ListingType.SALE,
      price: 1500000,
      address: '300 Nguyễn Xí',
      ward: 'Phường 13',
      district: 'Quận Bình Thạnh',
      city: 'TP. Hồ Chí Minh',
      latitude: 10.8010,
      longitude: 106.7120,
      userId: user2.id,
      images: [
        'https://images.unsplash.com/photo-1600518464441-9154a4dea21b?w=800',
      ],
    },
  ];

  // Create properties with images
  for (const prop of properties) {
    const { images, ...propertyData } = prop;
    
    const property = await prisma.property.create({
      data: {
        ...propertyData,
        status: PropertyStatus.ACTIVE,
        images: {
          create: images.map((url, index) => ({
            url,
            order: index,
          })),
        },
      },
    });

    console.log(`✅ Created property: ${property.title}`);
  }

  // Create some favorites
  const allProperties = await prisma.property.findMany({ take: 5 });
  
  await prisma.favorite.create({
    data: {
      userId: user1.id,
      propertyId: allProperties[1].id,
    },
  });

  await prisma.favorite.create({
    data: {
      userId: user1.id,
      propertyId: allProperties[3].id,
    },
  });

  await prisma.favorite.create({
    data: {
      userId: user2.id,
      propertyId: allProperties[0].id,
    },
  });

  console.log('✅ Created sample favorites');

  // Create some messages
  await prisma.message.create({
    data: {
      content: 'Chào anh/chị, tôi quan tâm đến căn hộ này. Cho tôi xin thêm thông tin được không ạ?',
      senderId: user2.id,
      receiverId: user1.id,
      propertyId: allProperties[0].id,
    },
  });

  await prisma.message.create({
    data: {
      content: 'Dạ chào anh/chị, cảm ơn đã quan tâm. Anh/chị có thể liên hệ số điện thoại để em tư vấn chi tiết hơn ạ.',
      senderId: user1.id,
      receiverId: user2.id,
      propertyId: allProperties[0].id,
    },
  });

  console.log('✅ Created sample messages');

  console.log('');
  console.log('🎉 Seed completed successfully!');
  console.log('');
  console.log('📝 Test accounts:');
  console.log('   Email: nguyen.van.a@email.com | Password: password123');
  console.log('   Email: tran.thi.b@email.com | Password: password123');
  console.log('   Email: le.van.c@email.com | Password: password123');
}

main()
  .catch((e) => {
    console.error('Error during seed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
