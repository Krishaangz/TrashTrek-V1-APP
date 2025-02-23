interface AIResponse {
  keywords: string[];
  response: string;
}

export const aiResponses: AIResponse[] = [
  {
    keywords: ['points', 'earn', 'eco', 'how'],
    response: "You can earn Eco Points through various activities: 1) Daily quizzes (2 points per correct answer + speed bonuses), 2) Verified cleanup activities (10-50 points based on impact), 3) Educational content engagement (5 points), and 4) Community challenges (variable points). Reaching milestones unlocks special features!"
  },
  {
    keywords: ['trash', 'detection', 'work', 'how'],
    response: "Our AI-powered trash detection system uses computer vision to identify and classify waste items in real-time. Simply point your camera at waste items, and the app will identify the type of waste and provide proper disposal instructions. The system is 95% accurate and continuously learning from user feedback."
  },
  {
    keywords: ['global', 'chat', 'unlock', 'when'],
    response: "The global chat feature unlocks at 1,000 Eco Points. This milestone ensures meaningful community interactions and helps maintain a positive environment. Keep participating in activities to earn points faster!"
  },
  {
    keywords: ['marketplace', 'rewards', 'redeem'],
    response: "The marketplace offers various eco-friendly rewards: 1) Tree planting (100 points), 2) Gift cards (500-1000 points), 3) Eco-friendly products (300-800 points). Points are automatically deducted upon successful redemption, and rewards are processed within 24 hours."
  },
  {
    keywords: ['mission', 'goal', 'purpose'],
    response: "TrashTrek's mission is to revolutionize environmental cleanup through gamification and technology. We aim to: 1) Make waste collection engaging and rewarding, 2) Build a global community of environmental advocates, 3) Create measurable environmental impact through collective action."
  },
  {
    keywords: ['rank', 'levels', 'system'],
    response: "Our ranking system reflects your environmental impact: Eco Rookie (0-99), Earth Defender (100-249), Nature Protector (250-499), Eco Guardian (500-999), Green Warrior (1000-2499), Sustainability Champion (2500-4999), Environmental Master (5000-9999), and Eco Legend (10000+)."
  },
  {
    keywords: ['safety', 'guidelines', 'cleanup'],
    response: "Safety is our top priority. Always: 1) Wear protective gear (gloves, appropriate footwear), 2) Avoid hazardous materials (report them in-app), 3) Stay visible in public areas, 4) Work in pairs when possible, 5) Follow local regulations. The app includes a safety guide and emergency contact features."
  },
  {
    keywords: ['verify', 'verification', 'cleanup'],
    response: "Cleanup verification uses a multi-step process: 1) Before/after photos with GPS location, 2) AI analysis of waste quantity and type, 3) Timestamp verification, 4) Community validation for larger cleanups. This ensures fair point distribution and maintains system integrity."
  },
  {
    keywords: ['profile', 'picture', 'photo', 'change'],
    response: "To update your profile picture: 1) Go to Account Settings, 2) Click the camera icon or current photo, 3) Select a new image, 4) Crop if needed, 5) Save changes. Supported formats are JPG, PNG, and GIF (under 5MB)."
  },
  {
    keywords: ['password', 'change', 'reset'],
    response: "To change your password: 1) Visit Account Settings, 2) Go to the Security section, 3) Enter your current password, 4) Create a new password (min. 8 characters), 5) Confirm the new password, 6) Click Save Changes. For security, you'll be asked to re-login."
  },
  {
    keywords: ['delete', 'account', 'remove'],
    response: "To delete your account: 1) Go to Account Settings, 2) Scroll to the Danger Zone section, 3) Click 'Delete Account', 4) Confirm your decision. Note: This action is permanent and will erase all your data and achievements."
  },
  {
    keywords: ['report', 'issue', 'bug', 'problem'],
    response: "To report an issue: 1) Visit the Help Center, 2) Click 'Report Issue', 3) Select the issue type, 4) Describe the problem in detail, 5) Add any relevant attachments, 6) Submit. Our team typically responds within 24 hours."
  },
  {
    keywords: ['contact', 'support', 'help'],
    response: "Need help? Contact us via: 1) Email: trashtrekindia@gmail.com, 2) Phone: +91 62610 26345, 3) In-app Help Center, 4) Community forums. Support hours: Monday-Friday, 9:00 AM - 6:00 PM IST."
  },
  {
    keywords: ['trees', 'plant', 'planting'],
    response: "Tree planting through TrashTrek: 1) Costs 100 Eco Points per tree, 2) Plants are native to your region, 3) Includes 6-month growth tracking, 4) Certificate of planting provided, 5) GPS coordinates of your tree shared. We partner with local environmental organizations for planting."
  },
  {
    keywords: ['challenge', 'event', 'competition'],
    response: "Monthly challenges offer unique opportunities: 1) Special themes and goals, 2) Bonus point multipliers, 3) Team participation options, 4) Exclusive rewards, 5) Community recognition. Check the Events tab for current and upcoming challenges!"
  },
  {
    keywords: ['local', 'eco', 'store', 'support'],
    response: "Support local businesses! TrashTrek partners with eco-friendly shops to provide you with sustainable products like reusable bags, compostable utensils, and eco-friendly cleaning supplies. You can browse these stores through the app's marketplace!"
  },
  {
    keywords: ['carbon', 'footprint', 'reduce', 'how'],
    response: "Reducing your carbon footprint is simple! Use TrashTrek's features to recycle more, plant trees, and participate in local cleanup events. Small actions, like reducing waste and using public transport, add up and make a big impact on the environment."
  },
  {
    keywords: ['compost', 'how', 'start'],
    response: "Starting a composting habit is easy: 1) Choose a compost bin or pile, 2) Add organic waste like food scraps and yard clippings, 3) Turn it regularly, 4) Avoid meat, dairy, and oils. Use your compost for gardening or donate it to local farms!"
  },
  {
    keywords: ['recycle', 'wrong', 'what', 'happen'],
    response: "If you recycle something incorrectly, it can contaminate other recyclables, making them harder or impossible to recycle. Check local recycling guidelines to ensure you're putting items in the right bin, and if you're unsure, the app provides helpful tips!"
  },
  {
    keywords: ['impact', 'track', 'environment'],
    response: "Track your environmental impact directly through TrashTrek. The app logs your cleanup activities, points earned, trees planted, and your position in the global leaderboard. You can see how much trash you've helped remove and how many trees you’ve contributed to planting!"
  },
  {
    keywords: ['app', 'update', 'how'],
    response: "To update your TrashTrek app: 1) Go to the App Store or Google Play Store, 2) Search for TrashTrek, 3) Click 'Update' if a new version is available. Ensure you have an internet connection and sufficient storage space on your device."
  },
  {
    keywords: ['tasks', 'assignment', 'how', 'receive'],
    response: "You can receive tasks in the app through notifications, under the 'Challenges' section, or by joining local cleanups. Tasks include different activities, like collecting specific types of waste or participating in community competitions. Complete them for points and rewards!"
  },
  {
    keywords: ['sponsorship', 'eco', 'support', 'how'],
    response: "TrashTrek welcomes sponsors who want to support environmental initiatives. Businesses can partner with us to promote eco-friendly products, fund cleanup events, or provide exclusive rewards for our users. If you're interested, reach out via the app or website."
  },
  {
    keywords: ['refill', 'station', 'water', 'eco'],
    response: "TrashTrek encourages you to use eco-friendly refill stations for water instead of buying plastic bottles. Check the app for nearby refill stations or water fountains, and save money while reducing plastic waste!"
  },
  {
    keywords: ['collaboration', 'other', 'apps', 'integrations'],
    response: "TrashTrek is working on integrating with other eco-focused apps like energy-saving tools, carbon offset platforms, and local sustainability initiatives. Stay tuned for future collaborations that will make your green journey even more rewarding!"
  },
  {
    keywords: ['community', 'leaderboard', 'global', 'see'],
    response: "Check out the global leaderboard in the app to see how you rank against other eco-warriors! You can filter results by location, challenge participation, or points earned. It’s a fun way to stay motivated and track your progress!"
  },
  {
    keywords: ['recycling', 'types', 'what'],
    response: "There are several types of recycling: 1) Single-stream recycling (all recyclables in one bin), 2) E-waste recycling (for electronics), 3) Paper and cardboard recycling, 4) Organic waste for composting, and 5) Glass, aluminum, and plastic recycling. Know which type fits your items!"
  },
  {
    keywords: ['trash', 'sorted', 'how'],
    response: "Sorting your trash is key to effective recycling. Separate items into categories like: 1) Paper and cardboard, 2) Plastics and metals, 3) Glass, 4) Organics, 5) Non-recyclables. You can even use TrashTrek’s scanning feature to help sort waste correctly!"
  },
  {
    keywords: ['biodegradable', 'items', 'examples'],
    response: "Biodegradable items include: 1) Food scraps (vegetable peels, coffee grounds), 2) Paper towels, 3) Biodegradable bags, 4) Wooden cutlery. Always check if an item is truly biodegradable before composting it to prevent contamination!"
  },
  {
    keywords: ['eco-friendly', 'brands', 'products'],
    response: "TrashTrek supports eco-friendly brands. Look for items like 1) Recycled paper products, 2) Biodegradable cleaning supplies, 3) Reusable shopping bags, 4) Solar-powered gadgets, 5) Energy-efficient appliances in our app's marketplace!"
  },
  {
    keywords: ['green', 'washing', 'what'],
    response: "Greenwashing is when companies falsely claim their products are eco-friendly. To avoid falling for greenwashing, check for certifications like Energy Star, Fair Trade, or FSC-certified products, and read reviews before making eco-friendly purchases!"
  },
  {
    keywords: ['trash', 'collection', 'app', 'features'],
    response: "TrashTrek’s trash collection feature lets you log your activities easily. Snap a photo of collected trash, tag it with the type of waste, and track your cleanup journey. You can even challenge friends to join in and make a bigger impact together!"
  },
  {
    keywords: ['eco', 'friendly', 'habits', 'adopt'],
    response: "To adopt more eco-friendly habits, try: 1) Reducing plastic use, 2) Composting, 3) Using public transportation, 4) Recycling properly, 5) Supporting eco-conscious brands. Start small and gradually build sustainable habits that fit your lifestyle!"
  },
  {
    keywords: ['eco', 'travel', 'tips'],
    response: "For eco-friendly travel: 1) Use reusable water bottles, 2) Pack light to reduce fuel consumption, 3) Avoid single-use plastic, 4) Choose eco-certified hotels, 5) Support local businesses. Every little bit counts when you’re on the go!"
  },
  {
    keywords: ['user', 'points', 'guide', 'how'],
    response: "To maximize your Eco Points: 1) Complete daily quizzes for fast points, 2) Engage in regular cleanups, 3) Participate in challenges, 4) Share educational content, 5) Invite friends to join TrashTrek. Keep an eye on the Points Tracker in your profile!"
  },
  {
    keywords: ['volunteer', 'trash', 'cleanup', 'how'],
    response: "You can volunteer for trash cleanups by signing up through the 'Events' section in the app. Local groups and organizations regularly host cleanups, and TrashTrek helps connect you with opportunities. Your volunteer work can earn points and rewards!"
  },
  {
    keywords: ['gift', 'eco', 'options'],
    response: "Looking for eco-friendly gift ideas? TrashTrek’s marketplace has a variety of options, including 1) Solar-powered gadgets, 2) Reusable coffee cups, 3) Eco-friendly tech accessories, 4) Sustainable fashion. Gift green and make a positive impact!"
  },
  {
    keywords: ['e-waste', 'dispose', 'how'],
    response: "E-waste disposal is important! Never throw electronics like phones, laptops, or batteries in the trash. Look for certified e-waste recycling centers or use TrashTrek’s in-app guide to find the closest one. Proper disposal prevents toxic chemicals from harming the environment."
  },
  {
    keywords: ['ranks', 'benefits', 'unlock', 'features'],
    response: "Each TrashTrek rank unlocks new features: Eco Rookie (basic features), Earth Defender (custom badges), Nature Protector (special challenges), Eco Guardian (team creation), Green Warrior (global chat & events), Sustainability Champion (mentor status), Environmental Master (custom challenges), Eco Legend (spotlight features)."
  },
  {
    keywords: ['adventure', 'mode', 'locations', 'challenges'],
    response: "Adventure Mode uses GPS to guide you to high-impact cleanup locations. Features include: 1) Real-time location tracking, 2) Area-specific challenges, 3) Hidden achievement spots, 4) Bonus point zones, 5) Team coordination features. Complete location-based missions for extra rewards!"
  },
  {
    keywords: ['trashpedia', 'learn', 'articles', 'knowledge'],
    response: "Trashpedia is your environmental knowledge hub, featuring: 1) Detailed waste classification guides, 2) Recycling best practices, 3) Environmental impact studies, 4) Local disposal regulations, 5) Sustainability tips. Content is regularly updated with the latest environmental research."
  },
  {
    keywords: ['daily', 'quiz', 'topics', 'categories'],
    response: "Daily quizzes cover diverse environmental topics: 1) Waste Management, 2) Climate Change, 3) Marine Conservation, 4) Sustainable Living, 5) Renewable Energy. Each quiz has unique questions and rewards bonus points for quick, accurate responses."
  },
  {
    keywords: ['camera', 'detection', 'accuracy', 'improve'],
    response: "Our AI camera detection system improves with user feedback. To enhance accuracy: 1) Ensure good lighting, 2) Hold the camera steady, 3) Frame the entire object, 4) Submit feedback for incorrect detections, 5) Update the app regularly for the latest detection models."
  },
  {
    keywords: ['analytics', 'dashboard', 'metrics', 'track'],
    response: "The analytics dashboard shows your environmental impact through: 1) Interactive cleanup history graphs, 2) Point accumulation trends, 3) Challenge completion rates, 4) Community contribution metrics, 5) Impact comparisons. Data updates in real-time to track your progress."
  },
  {
    keywords: ['community', 'events', 'organize', 'host'],
    response: "Want to host a community cleanup? 1) Use the Event Creator tool, 2) Set location and time, 3) Specify cleanup goals, 4) Add safety guidelines, 5) Invite participants. The app provides event management tools and automatic point distribution for participants."
  },
  {
    keywords: ['profile', 'badges', 'achievements', 'display'],
    response: "Customize your profile with earned badges and achievements! Display your: 1) Cleanup specialties, 2) Challenge victories, 3) Community contributions, 4) Environmental impact stats, 5) Special event participation. Badges are automatically awarded as you meet criteria."
  },
  {
    keywords: ['challenge', 'mode', 'teams', 'compete'],
    response: "Challenge Mode lets you compete in teams! Features include: 1) Real-time team scoreboards, 2) Collaborative goals, 3) Team chat functionality, 4) Progress tracking, 5) Shared rewards. Form teams of up to 5 members and tackle environmental challenges together!"
  },
  {
    keywords: ['standard', 'mode', 'guidelines', 'basic'],
    response: "Standard Mode is perfect for solo cleanup sessions. Follow these steps: 1) Start the 30-second prep timer, 2) Scan surroundings for safety, 3) Use AI detection for waste identification, 4) Document proper disposal, 5) Submit for points. Perfect for daily environmental contributions!"
  },
  {
    keywords: ['founder', 'krishang', 'saharia', 'started'],
    response: "TrashTrek was founded by Krishang Saharia with the vision of transforming environmental cleanup into an engaging, gamified experience. His innovative approach combines technology with environmental stewardship to create meaningful impact through community action."
  },
  {
    keywords: ['vision', 'mission', 'statement', 'core'],
    response: "TrashTrek's core mission is to revolutionize environmental cleanup through gamification while building a global community of eco-warriors. Our vision encompasses: 1) Making environmental action engaging, 2) Creating measurable impact, 3) Building sustainable communities, 4) Educating through interaction."
  },
  {
    keywords: ['onboarding', 'process', 'registration', 'steps'],
    response: "The TrashTrek onboarding process includes: 1) Initial registration with email, 2) OTP verification, 3) Profile creation (name, DOB, gender), 4) Safety guidelines review, 5) Tutorial completion. Each step is designed to ensure a smooth start to your environmental journey."
  },
  {
    keywords: ['authentication', 'security', 'data', 'privacy'],
    response: "TrashTrek prioritizes user security through: 1) Secure Firebase authentication, 2) Data encryption, 3) Privacy-focused design, 4) Regular security audits, 5) Transparent data handling. Your information is protected while you focus on environmental impact."
  },
  {
    keywords: ['loading', 'screen', 'quotes', 'inspiration'],
    response: "Our loading screens feature curated environmental quotes and facts to inspire and educate. These dynamic displays change regularly, offering fresh perspective on environmental conservation while the app prepares your personalized experience."
  },
  {
    keywords: ['statistics', 'tracking', 'progress', 'measure'],
    response: "TrashTrek measures your impact through comprehensive statistics: 1) Total waste collected, 2) Trees planted, 3) Community influence, 4) Challenge participation, 5) Point progression. Watch your environmental contribution grow in real-time!"
  },
  {
    keywords: ['achievements', 'milestones', 'recognition', 'special'],
    response: "Unlock special achievements through: 1) Cleanup milestones, 2) Community leadership, 3) Educational completion, 4) Challenge victories, 5) Sustained participation. Each achievement comes with unique badges and point bonuses!"
  },
  {
    keywords: ['graphs', 'analytics', 'visualization', 'data'],
    response: "Track your environmental impact through interactive graphs showing: 1) Monthly cleanup trends, 2) Point accumulation patterns, 3) Community engagement levels, 4) Challenge performance, 5) Comparative statistics with global averages."
  },
  {
    keywords: ['chat', 'channel', 'access', 'requirements'],
    response: "The community chat channel unlocks at 1000 points and offers: 1) Real-time discussions, 2) Event coordination, 3) Tips sharing, 4) Achievement celebrations, 5) Community support. Build connections while making environmental impact!"
  },
  {
    keywords: ['email', 'notifications', 'alerts', 'updates'],
    response: "Stay informed with TrashTrek's notification system: 1) Challenge alerts, 2) Achievement notifications, 3) Community event updates, 4) Point milestone celebrations, 5) Educational content alerts. Customize your notification preferences in settings."
  },
  {
    keywords: ['countdown', 'timer', 'safety', 'preparation'],
    response: "The 30-second countdown timer ensures proper preparation: 1) Gather safety equipment, 2) Check surroundings, 3) Prepare collection bags, 4) Review guidelines, 5) Confirm location safety. Safety first for effective environmental action!"
  },
  {
    keywords: ['object', 'detection', 'ai', 'technology'],
    response: "Our AI-powered object detection uses advanced algorithms for: 1) Waste identification, 2) Material classification, 3) Disposal guidance, 4) Safety warnings, 5) Impact calculation. The system learns and improves with each use!"
  },
  {
    keywords: ['surroundings', 'check', 'safety', 'protocol'],
    response: "The 10-second surroundings check ensures: 1) Area safety, 2) Proper lighting, 3) Clear pathways, 4) Hazard identification, 5) Emergency exit awareness. Always prioritize safety during cleanup activities!"
  },
  {
    keywords: ['disposal', 'bins', 'location', 'finding'],
    response: "Locate proper disposal bins through: 1) In-app map integration, 2) Nearest bin finder, 3) Recycling center locations, 4) Disposal facility details, 5) Community-verified locations. Ensure proper waste disposal for maximum impact!"
  },
  {
    keywords: ['video', 'confirmation', 'proof', 'submission'],
    response: "Submit cleanup proof through: 1) Before/after photos, 2) Location verification, 3) Waste type documentation, 4) Disposal confirmation, 5) Impact assessment. Proper documentation ensures accurate point allocation!"
  },
  {
    keywords: ['maps', 'integration', 'location', 'features'],
    response: "TrashTrek's map integration provides: 1) Cleanup hotspots, 2) Challenge locations, 3) Team meetup points, 4) Disposal facilities, 5) Event venues. Navigate your environmental impact efficiently!"
  },
  {
    keywords: ['designated', 'sites', 'cleanup', 'locations'],
    response: "Designated cleanup sites are selected based on: 1) Environmental need, 2) Safety considerations, 3) Accessibility, 4) Community impact, 5) Local partnerships. These locations maximize your cleanup effectiveness!"
  },
  {
    keywords: ['park', 'cleanup', 'guidelines', 'special'],
    response: "Park cleanup events feature: 1) Specific zone assignments, 2) Team coordination, 3) Wildlife protection guidelines, 4) Vegetation preservation rules, 5) Public space protocols. Help maintain our community spaces!"
  },
  {
    keywords: ['beach', 'rescue', 'protocol', 'marine'],
    response: "Beach rescue missions include: 1) Marine waste identification, 2) Shoreline protection guidelines, 3) Wildlife safety protocols, 4) Tide consideration, 5) Special equipment requirements. Protect our coastal environments!"
  },
  {
    keywords: ['quiz', 'timing', 'bonus', 'points'],
    response: "Daily quiz bonus points are awarded for: 1) Quick responses, 2) Accurate answers, 3) Consecutive participation, 4) Topic mastery, 5) Challenge completion. Test your environmental knowledge for extra rewards!"
  },
  {
    keywords: ['generator', 'facts', 'database', 'educational'],
    response: "Our fact generator features: 1) Daily environmental facts, 2) Scientific discoveries, 3) Conservation success stories, 4) Local environmental news, 5) Global impact statistics. Learn something new every day!"
  },
  {
    keywords: ['local', 'players', 'ranking', 'community'],
    response: "Local rankings show: 1) Neighborhood leaders, 2) Community impact scores, 3) Local event participation, 4) Area-specific challenges, 5) Regional achievements. Compete with nearby environmental champions!"
  },
  {
    keywords: ['global', 'ranking', 'system', 'worldwide'],
    response: "The global ranking system displays: 1) Worldwide leaderboard, 2) International achievements, 3) Cross-country challenges, 4) Global impact metrics, 5) Community milestones. See your place in the worldwide environmental movement!"
  },
  {
    keywords: ['trivia', 'centre', 'learning', 'education'],
    response: "The Trivia Centre offers: 1) Daily environmental challenges, 2) Educational content, 3) Interactive learning, 4) Knowledge testing, 5) Point-earning opportunities. Expand your environmental awareness while earning rewards!"
  },
  {
    keywords: ['redeem', 'system', 'process', 'rewards'],
    response: "The reward redemption process includes: 1) Point verification, 2) Reward selection, 3) Impact calculation, 4) Confirmation process, 5) Delivery tracking. Turn your environmental actions into tangible results!"
  },
  {
    keywords: ['marketplace', 'button', 'interaction', 'shop'],
    response: "The Marketplace features: 1) Eco-friendly products, 2) Reward redemption, 3) Impact tracking, 4) Point balance updates, 5) Special offers. Browse and redeem your hard-earned points for environmental impact!"
  },
  {
    keywords: ['username', 'change', 'profile', 'update'],
    response: "Update your profile easily: 1) Change username, 2) Update photo, 3) Modify preferences, 4) Adjust privacy settings, 5) Edit personal information. Keep your TrashTrek identity current!"
  },
  {
    keywords: ['picture', 'upload', 'guidelines', 'photo'],
    response: "Profile picture guidelines: 1) Clear face shot, 2) Appropriate content, 3) Good lighting, 4) Recent photo, 5) Under 5MB size. Show your environmental warrior spirit!"
  },
  {
    keywords: ['privacy', 'settings', 'controls', 'options'],
    response: "Control your privacy through: 1) Profile visibility settings, 2) Data sharing options, 3) Location permissions, 4) Contact sharing preferences, 5) Activity visibility. Your privacy is important to us!"
  },
  {
    keywords: ['notification', 'preferences', 'alerts', 'settings'],
    response: "Customize notifications for: 1) Challenge alerts, 2) Point updates, 3) Community events, 4) Achievement unlocks, 5) Educational content. Stay informed about what matters to you!"
  },
  {
    keywords: ['story', 'background', 'history', 'development'],
    response: "TrashTrek's journey began with a vision to combine technology and environmental action. The app has evolved through: 1) Community feedback, 2) Technological advancement, 3) Environmental research, 4) User experience optimization, 5) Impact assessment."
  },
  {
    keywords: ['animations', 'interface', 'visual', 'design'],
    response: "TrashTrek's interface features: 1) Eco-themed animations, 2) Interactive elements, 3) Progress visualizations, 4) Achievement celebrations, 5) Dynamic content. Experience environmental action in an engaging way!"
  },
  {
    keywords: ['assistant', 'ai', 'help', 'support'],
    response: "Our AI assistant provides: 1) Instant support, 2) Feature guidance, 3) Problem resolution, 4) App navigation help, 5) Quick tips. Get the help you need to maximize your environmental impact!"
  },
  {
    keywords: ['reporting', 'system', 'feedback', 'issues'],
    response: "Report issues through: 1) In-app form, 2) Email support, 3) Community feedback, 4) Bug reporting, 5) Feature requests. Help us improve TrashTrek for everyone!"
  },
  {
    keywords: ['supabase', 'database', 'storage', 'management'],
    response: "Our Supabase integration ensures: 1) Secure data storage, 2) Real-time updates, 3) Reliable authentication, 4) Fast performance, 5) Scalable infrastructure. Your data is safe and accessible!"
  },
  {
    keywords: ['models', 'detection', 'classification', 'accuracy'],
    response: "Our detection models utilize: 1) YOLO-TFLite integration, 2) CNN classifiers, 3) Real-time processing, 4) Accuracy optimization, 5) Continuous learning. Accurate waste identification for better impact!"
  },
  {
    keywords: ['dynamic', 'system', 'points', 'calculation'],
    response: "Points are calculated through: 1) Activity type, 2) Impact measurement, 3) Challenge participation, 4) Community contribution, 5) Educational engagement. Every action counts toward your environmental impact!"
  },
  {
    keywords: ['free', 'roam', 'mode', 'exploration'],
    response: "Free Roam mode allows: 1) Flexible cleanup locations, 2) Personal pace setting, 3) Custom challenge creation, 4) Independent impact tracking, 5) Spontaneous environmental action. Make a difference on your own terms!"
  },
  {
    keywords: ['performance', 'tracking', 'metrics', 'measurement'],
    response: "Track your performance through: 1) Impact metrics, 2) Point accumulation, 3) Challenge completion, 4) Community contribution, 5) Environmental influence. Watch your positive impact grow!"
  },
  {
    keywords: ['milestone', 'celebration', 'recognition', 'achievements'],
    response: "Celebrate milestones with: 1) Special badges, 2) Point bonuses, 3) Community recognition, 4) Achievement unlocks, 5) Reward opportunities. Your environmental efforts deserve celebration!"
  },
  {
    keywords: ['material', 'classification', 'types', 'identification'],
    response: "Our system classifies materials into: 1) Recyclables, 2) Organic waste, 3) Hazardous materials, 4) Electronic waste, 5) General trash. Proper classification ensures optimal disposal!"
  },
  {
    keywords: ['hazard', 'warning', 'system', 'alerts'],
    response: "Hazard warnings include: 1) Material danger levels, 2) Proper handling procedures, 3) Emergency protocols, 4) Safety equipment requirements, 5) Disposal guidelines. Stay safe while making a difference!"
  },
  {
    keywords: ['emergency', 'protocols', 'safety', 'procedures'],
    response: "Emergency procedures include: 1) Immediate response guidelines, 2) Emergency contact access, 3) Location sharing, 4) Hazard reporting, 5) Safety protocols. Your safety is our top priority!"
  },
  {
    keywords: ['contribution', 'impact', 'measurement', 'analysis'],
    response: "Measure your contribution through: 1) Waste collection data, 2) Environmental impact metrics, 3) Community influence, 4) Challenge participation, 5) Educational engagement. See the difference you're making!"
  },
  {
    keywords: ['contact', 'sync', 'friends', 'connection'],
    response: "Connect with friends through: 1) Contact synchronization, 2) Team formation, 3) Challenge invitations, 4) Achievement sharing, 5) Community engagement. Build your environmental network!"
  },
  {
    keywords: ['legal', 'compliance', 'regulations', 'guidelines'],
    response: "TrashTrek ensures compliance with: 1) Data protection laws, 2) Environmental regulations, 3) Safety standards, 4) User privacy requirements, 5) Local ordinances. Operating within legal frameworks!"
  },
  {
    keywords: ['rulebook', 'guidelines', 'official', 'policies'],
    response: "The TrashTrek rulebook covers: 1) User conduct, 2) Point system rules, 3) Challenge guidelines, 4) Safety protocols, 5) Community standards. Follow the guidelines for optimal experience!"
  },
  {
    keywords: ['eco', 'warrior', 'journey', 'progress'],
    response: "Your eco-warrior journey includes: 1) Skill development, 2) Knowledge acquisition, 3) Community building, 4) Impact creation, 5) Environmental leadership. Grow as an environmental champion!"
  },
  {
    keywords: ['partnership', 'collaboration', 'organizations', 'allies'],
    response: "TrashTrek partners with: 1) Environmental organizations, 2) Local communities, 3) Educational institutions, 4) Government bodies, 5) Eco-friendly businesses. Together for greater impact!"
  }
];

