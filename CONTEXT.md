# TrashTrek
TrashTrek - An Interactive Trash Collection Game!

-----

# TrashTrek: Ultimate Detailed Specification Document

TrashTrek is a cross-platform mobile gaming app designed to transform environmental cleanup into an engaging, competitive, and educational experience. By gamifying trash collection and integrating cutting-edge technology, TrashTrek empowers users to make a tangible impact on the environment while earning rewards, tracking their progress, and engaging with a like-minded community.

---

## Table of Contents

1. [Overview](#overview)
2. [User Journey and App Flow](#user-journey-and-app-flow)
   - [Onboarding and Authentication](#onboarding-and-authentication)
   - [Home Screen](#home-screen,stats-and-analytics)
   - [Deploy Module](#deploy-module) - WILL NOT WORK IN WEBSITE. THIS TRANSFORMS INTO THE GET STARTED PAGE.
   - [Get Started](#Get-Started) - IS NOT PRESENT IN APP. THIS TRANSFORMS INTO THE ACTUAL DEPLOY PAGE.
   - [Trivia and Fun Facts](#trivia-and-fun-facts)
   - [Leaderboards and Community Engagement](#leaderboards-and-community-engagement)
   - [Profile and Account Settings with Marketplace](#profile-and-account-settings,marketplace)
   - [About Us](#about-us)
     - [Help Centre and Issue Reporting](#help-centre-and-issue-reporting)
3. [Key Features and Functionalities](#key-features-and-functionalities)
   - [User Authentication](#user-authentication)
   - [Camera-Based Trash Detection](#camera-based-trash-detection) - WILL WORK ONLY IN MOBILE APP, NOT IN THIS WEBSITE.
   - [Integration of Trashpedia in the Home Dashboard](#integration-of-trashpedia)
   - [Eco-Points and Rewards System](#eco-points-and-rewards-system)
   - [Gamification Modes](#gamification-modes)
4. [Technical Considerations](#technical-considerations)
5. [Future Enhancements](#future-enhancements)
6. [Conclusion](#conclusion)

---

## Overview

TrashTrek transforms everyday environmental cleanup into a dynamic, interactive game. The app uses the phone’s camera (currently supporting static image uploads, with plans for live detection) to identify trash items and guides users on proper disposal methods. By participating in various game modes, users earn Eco-Points that can be redeemed for tangible rewards (e.g., tree planting) and are displayed on detailed analytics dashboards. TrashTrek also features educational content via an integrated Trashpedia, interactive quizzes, and community-driven challenges.

---

## User Journey and App Flow

### Onboarding and Authentication
- **Onboarding Page:**  
  - Displays an inspirational ecological quote and a brief introduction to TrashTrek’s mission.
  - Provides a clear option for users to either **Sign In** (for returning users) or **Create a New Account** (for new users).
- **Registration Process:**  
  - For new account creation:  
    - Enter Email, create a strong Password then proceed for OTP verification).
    - Complete profile details: Full Name, Date of Birth, and Gender after verifying email.
- **Post-Authentication:**  
  - A loading screen with an ecological quote transitions the user to the Home Screen Dashboard.

### Home Screen Dashboard
- **Dashboard:**  
  - Displays key user details including join date, current Eco-Points, number of trees planted, important analytical graphs and leaderboard rankings.
  - Once you unlock achievements like advancing to a new rank, it displays with cool animations. 
  - User Statistics:  
    - Detailed dashboards with interactive graphs tracking:
      - Total Eco-Points earned over time.
      - Number of trees planted (e.g., 100 points = 1 tree).
      - Trends in trash collection performance.
      - Dynamic, real-time leaderboard position adjustments.
      - How much eco-points left to earn to unlock new ranks.
  - Incorporates interactive, user tracking graphs and analytics to show performance trends.
  - Includes a community channel chat (top right) for messaging and updates:
      - **Community Channel:**  
        - A dedicated chat/forum for users to share tips, coordinate cleanup events, and celebrate achievements, only accessible once the user earns 1000 eco points.
      - **Notification Panel:**  
        - A dedicated notifications tab that updates with real-time notifications of user data statistics and analytics accordingly. 
      - **Friends Panel:**  
        - A dedicated friends panel that shows incoming or outgoing friend requests as well as who your friends are in the TrashTrek App.
- **Trashpedia:**  
  - A section of the website that presents a curated futuristic wikipedia styled webpage featuring unique, non-repetitive articles on trash types, recycling guidelines, and sustainability tips.

### Community Feature Section

A component element in the side hamburger menu: a component named `Community.tsx`. This search component is placed between the Home and Deploy components and allow users (only after reaching 1,000 Eco-Points and unlocking Community Chat) to search for other registered users and add them as friends—similar to social platforms like Facebook or Instagram. Also has two more tabs- One with trashtrek official blog post updates and one where users can post their journey. If users become friends, display their connections in a dedicated pop-up window on the top-right of the app - Friends Panel (to the left of Notification Panel and Community Chat components). Note that Eco-Points remain an independent currency, earned solely through environmental cleanup efforts, and cannot be shared across different users.

### Get Started - SECTION EXCLUSIVELY PRESENT IN THE TRASHTREK WEBSITE IN PLACE OF DEPLOY SECTION
- **Get Started Page:**
  - Has a call-to-action section inviting users to download the app from playstore and app store.
  - Lists a few features as to why they should join the global community.
  - Enhanced with interactive, futuristic elements.
  - Includes legal sections such as Privacy Policy, Terms and Conditions, and TrashTrek Rulebooks.

### Deploy Module - WILL ONLY WORK IN THE MOBILE APPLICATION, REPLACE GETSTARTED PAGE WITH THIS
- **Standard Mode:**  
  - A 30-second countdown prepares the user (e.g., putting on gloves, grabbing a bag).
  - The camera (currently for static image uploads) detects trash items, which are then highlighted.
  - A 10-second "Check Your Surroundings" safety prompt is displayed.
  - The user must locate a nearby disposal bin and submit a short video or confirmation to complete the task.
  - Successful task completion awards Eco-Points, updated on the Dashboard.
  
- **Adventure Mode:**  
  - Similar to Standard Mode, but with location-based challenges using Google Maps integration.
  - Designated trash collection sites are assigned, encouraging users to explore specific areas.
  
- **Challenge Mode:**  
  - Features community events such as “Park Cleanup” or “Beach Rescue.”
  - Users compete in real-time with friends and local players; leaderboards update immediately as points are earned.

- Includes legal sections such as Privacy Policy, Terms and Conditions, and TrashTrek Rulebooks.
  
### Trivia and Fun Facts
- **Daily Quiz:**  
  - An automated quiz that resets every 24 hours, featuring unique, environment-related questions.
  - Users earn Eco-Points for correct answers, with bonus points for speed.
- **Fun Fact Generator:**  
  - Integrates a database of over 250 unique environmental fun facts.
  - Ensures each fact presented is non-repetitive and engaging.

### Leaderboards and Community Engagement
- **Local Leaderboard:**  
  - Syncs with users’ contacts (upon permission) to display rankings among local players.
- **Global Leaderboard:**  
  - Provides real-time, dynamic updates reflecting users' rankings as Eco-Points are earned.
- **Trivia Centre:**  
  - Displays a leaderboard based on daily quiz scores, encouraging friendly competition.


### Marketplace
- **Functional Redeem System:**  
  - Users can redeem their Eco-Points for rewards, such as planting trees.
  - The "Redeem" button is fully functional: upon redemption, the user’s Eco-Points are deducted, and the Dashboard statistics are updated automatically.
  - All other interactive buttons in the Marketplace are enabled based on the user's current Eco-Points balance.

### Profile and Account Settings
- **Profile Management:**  
  - Users can view and update their account details:
    - Change Username.
    - Upload and update Profile Picture.
    - Change Password securely.
    - Ensure privacy settings.
    - Interact with notification preferences.
    - Other important account setting details.
  - A "Save Changes" button is active, allowing users to commit any updates.

### About Us
- **About Us:**  
  - The "Our Story" section has been refreshed to remove fabricated statistics, featuring engaging and futuristic animations (e.g., animated trash disposal and environmental restoration).
  - Also make sure that we list our vision, our missions, and a quote by founder of this app - Krishang Saharia

### Help Centre and Issue Reporting
- **Help Centre AI Assistant:**  
  - An AI-driven assistant that provides support on topics strictly related to the TrashTrek app.
- **Issue Reporting System:**  
  - A dedicated form that allows users to submit feedback and report issues.
  - Reports, along with the user's registered email, are automatically sent to trashtrekindia@gmail.com.

---

## Key Features and Functionalities

### User Authentication
- Secure and intuitive sign-up/sign-in with OTP verification.
- Integration with Supabase for managing user credentials and data.

### Camera-Based Trash Detection (In the mobile apllication, not the website)
- Real-time live camera scanning using object detection ai models.
- Uses open-source models (e.g., YOLO-TFLite or CNN-based classifiers) to accurately detect and classify trash items, offering guidelines for proper disposal.


### Eco-Points and Rewards System
- A dynamic system where users earn points for every trash collection task, or completing daily quizzes.
- Points can be redeemed in the Marketplace for rewards, such as planting trees, with real-time dashboard updates.
- Leaderboard positions adjust immediately as Eco-Points are accrued.

### Gamification Modes (for the mobile application)
- **Standard Mode:** Free roam trash collection with safety prompts.
- **Adventure Mode:** Location-based challenges using Google Maps.
- **Challenge Mode:** Community-driven events with competitive leaderboards.

### Interactive Analytics and User Engagement
- Comprehensive dashboards featuring interactive graphs that track:
  - Eco-Points progression.
  - Trash collection performance over time.
  - Leaderboard ranking changes.
  - Different ranks and shows how much points left to unlock next rank
- Enables users to visually monitor their environmental impact.

---

## Conclusion

TrashTrek is an innovative, engaging, and socially impactful mobile app that empowers users to contribute to a cleaner environment through gamified trash collection and interactive challenges. By combining advanced AI detection, dynamic analytics, and rich educational content, TrashTrek transforms everyday actions into meaningful environmental change. This comprehensive specification serves as a blueprint for developers to implement a high-quality, fully functional app that not only entertains but also drives real-world impact.

Happy coding, and let’s work together for a cleaner, greener future with TrashTrek!

