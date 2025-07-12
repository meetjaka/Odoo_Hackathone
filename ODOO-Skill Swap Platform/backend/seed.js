const mongoose = require('mongoose');
const User = require('./models/User');
const Skill = require('./models/Skill');
require('dotenv').config({ path: './config.env' });

const initialSkills = [
  { name: 'JavaScript', category: 'programming', description: 'Web development programming language' },
  { name: 'Python', category: 'programming', description: 'General-purpose programming language' },
  { name: 'React', category: 'programming', description: 'JavaScript library for building user interfaces' },
  { name: 'Node.js', category: 'programming', description: 'JavaScript runtime for server-side development' },
  { name: 'UI/UX Design', category: 'design', description: 'User interface and user experience design' },
  { name: 'Photoshop', category: 'design', description: 'Image editing and graphic design software' },
  { name: 'Figma', category: 'design', description: 'Collaborative interface design tool' },
  { name: 'Graphic Design', category: 'design', description: 'Visual communication and design' },
  { name: 'Digital Marketing', category: 'marketing', description: 'Online marketing strategies' },
  { name: 'Content Writing', category: 'creative', description: 'Creating written content for various purposes' },
  { name: 'Video Editing', category: 'creative', description: 'Editing and producing video content' },
  { name: 'Photography', category: 'creative', description: 'Capturing and editing photographs' },
  { name: 'Data Analysis', category: 'technical', description: 'Analyzing and interpreting data' },
  { name: 'Machine Learning', category: 'technical', description: 'AI and machine learning algorithms' },
  { name: 'Project Management', category: 'business', description: 'Managing projects and teams' },
  { name: 'Public Speaking', category: 'business', description: 'Effective communication and presentation skills' }
];

const initialUsers = [
  {
    name: 'Marc Demo',
    email: 'marc@example.com',
    password: 'password123',
    avatar: '',
    bio: 'Full-stack developer passionate about creating user-friendly applications',
    location: 'San Francisco, CA',
    availability: 'weekdays_evening',
    skillsOffered: ['JavaScript', 'React', 'Node.js'],
    skillsWanted: ['UI/UX Design', 'Graphic Design'],
    rating: 4.2,
    totalRatings: 15
  },
  {
    name: 'Michell Chen',
    email: 'michell@example.com',
    password: 'password123',
    avatar: '',
    bio: 'UI/UX designer with a love for clean and intuitive interfaces',
    location: 'New York, NY',
    availability: 'weekends_morning',
    skillsOffered: ['UI/UX Design', 'Figma', 'Photoshop'],
    skillsWanted: ['JavaScript', 'React'],
    rating: 3.8,
    totalRatings: 12
  },
  {
    name: 'Joe Wills',
    email: 'joe@example.com',
    password: 'password123',
    avatar: '',
    bio: 'Backend developer specializing in scalable systems',
    location: 'Austin, TX',
    availability: 'anytime',
    skillsOffered: ['Python', 'Node.js', 'Data Analysis'],
    skillsWanted: ['UI/UX Design', 'Digital Marketing'],
    rating: 4.5,
    totalRatings: 20
  },
  {
    name: 'Elena Rodriguez',
    email: 'elena@example.com',
    password: 'password123',
    avatar: '',
    bio: 'Creative designer and content creator',
    location: 'Los Angeles, CA',
    availability: 'weekdays_morning',
    skillsOffered: ['Graphic Design', 'Content Writing', 'Photography'],
    skillsWanted: ['JavaScript', 'React'],
    rating: 4.0,
    totalRatings: 18
  },
  {
    name: 'Ben Carter',
    email: 'ben@example.com',
    password: 'password123',
    avatar: '',
    bio: 'Marketing specialist with expertise in digital campaigns',
    location: 'Chicago, IL',
    availability: 'weekends_evening',
    skillsOffered: ['Digital Marketing', 'Content Writing', 'Public Speaking'],
    skillsWanted: ['React', 'Node.js'],
    rating: 3.7,
    totalRatings: 14
  },
  {
    name: 'Aisha Khan',
    email: 'aisha@example.com',
    password: 'password123',
    avatar: '',
    bio: 'Data scientist and machine learning enthusiast',
    location: 'Seattle, WA',
    availability: 'weekdays_evening',
    skillsOffered: ['Python', 'Machine Learning', 'Data Analysis'],
    skillsWanted: ['JavaScript', 'React'],
    rating: 4.3,
    totalRatings: 16
  }
];

async function seedDatabase() {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    // Clear existing data
    await User.deleteMany({});
    await Skill.deleteMany({});
    console.log('Cleared existing data');

    // Insert skills
    const createdSkills = await Skill.insertMany(initialSkills);
    console.log(`Created ${createdSkills.length} skills`);

    // Insert users
    const createdUsers = await User.insertMany(initialUsers);
    console.log(`Created ${createdUsers.length} users`);

    console.log('Database seeded successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Seeding error:', error);
    process.exit(1);
  }
}

seedDatabase(); 