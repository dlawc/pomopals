# Pomopals 🍅

A collaborative Pomodoro timer application designed to make studying more engaging and social. Pomopals combines the traditional Pomodoro technique with gamification elements, social features, and achievement systems to help users stay motivated and productive.

## 🌟 Features

### Core Timer Functionality
- **Pomodoro Timer**: Classic 25-minute work sessions with 5-minute breaks
- **Visual Progress**: Beautiful circular progress indicator with segmented animation
- **Session Management**: Start, pause, resume, and restart timer functionality
- **Study/Rest States**: Clear visual indicators for work and rest periods

### Social & Collaborative Features
- **Group Study Sessions**: Host or join study sessions with unique session codes
- **Friends System**: Add friends, view their profiles, and study together
- **Real-time Collaboration**: Synchronized timers for group study sessions
- **Session Codes**: Easy sharing of study sessions with friends

### Gamification & Achievements
- **XP System**: Earn experience points for completed study sessions
- **Achievement System**: Unlock achievements for various milestones
- **Progress Tracking**: Visual progress bars for ongoing achievements
- **Multiple Achievement Categories**:
  - Novice User (50 XP)
  - Master User (1000 XP)
  - Study Streaks
  - Session Completion Goals

### Leaderboards & Competition
- **Global Leaderboard**: Compare your progress with users worldwide
- **Friends Leaderboard**: Compete with your friends
- **Monthly Rankings**: Track monthly performance
- **Real-time Updates**: Live leaderboard updates

### Additional Features
- **URL Blocker**: Block distracting websites during study sessions
- **User Authentication**: Secure login/signup with Firebase
- **Responsive Design**: Works on desktop and mobile devices
- **Modern UI**: Clean, intuitive interface with smooth animations

## 🛠️ Technology Stack

- **Frontend**: Vue.js 3 with Composition API
- **Build Tool**: Vite
- **Routing**: Vue Router 4
- **Backend**: Firebase (Authentication, Firestore)
- **Styling**: CSS3 with custom animations
- **Icons**: FontAwesome
- **Progress Visualization**: Custom SVG animations


## 🚀 Usage

1. **Sign Up/Login**: Create an account or sign in with existing credentials
2. **Start Studying**: Use the timer on the home page to begin a Pomodoro session
3. **Invite Friends**: Share your session code with friends to study together
4. **Track Progress**: View your achievements and XP in the achievements page
5. **Compete**: Check leaderboards to see how you rank against others

## 📱 Key Components

- **Timer Component**: Core Pomodoro timer with visual progress
- **NavBar**: Navigation between different pages
- **FriendsList**: Manage and view your friends
- **Leaderboard**: Global and friends rankings
- **Achievements**: Track and view unlocked achievements
- **SessionCode**: Generate and share study session codes

## 🎯 Project Structure

```
src/
├── components/          # Reusable Vue components
├── views/              # Page components
├── router/             # Vue Router configuration
├── assets/             # Static assets (images, sounds)
├── firebase.js         # Firebase configuration
└── main.js            # App entry point
```
**Pomopals** - Making studying social, engaging, and productive! 🍅✨
