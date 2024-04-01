<template>
    <div class="achievementpage">
    <button id = "SignOut" type = "button">Sign Out</button> 
    <div id = "headercontainer">
        <h1 id = "myachievementsheader">My Achievements</h1>
    </div>  
    <div id = "viewallcontainer">
        <button id = "viewallbutton" type = "button"> View All</button>
        <image src = https://parspng.com/wp-content/uploads/2021/11/arrowpng.parspng.com-13.png id = "arrowdownimg"> </image>
    </div>
    <div class = "achievements-container">
    <div id = "AchievementCompletedContainer">
    <h1 id = "AchievementsCompletedHeader"> Achievements Unlocked</h1>
    <div id = "Achievementunlocked" v-for = "achievement in completedAchievements" :key = "achievement.id">
        <img :src="achievement.icon" alt="achievement.title" class="achievementcompleted-icon">
        <div class="achievementcompleted-details">
          <h2 class="title">{{ achievement.title }}</h2>
          <p class="subtitle">{{ achievement.description }}</p>
        </div>
        <span class="progresscompleted-text">Challenge Completed</span>
    </div>
</div>
    <div id="AchievementsInProgContainer" class="achievement-tab">
      <h1 id="AchievementsInProgHeader">Achievements In-Progress</h1>
      <!-- Use the computed property 'achievementsWithProgress' here -->
      <div class="achievement-in-progress" v-for="achievement in inProgressAchievements" :key="achievement.id">
        <img :src="`grey${achievement.icon}`" alt="achievement.title" class="achievementinprog-icon">
        <div class="achievement-details">
          <h2 class="greytitle">{{ achievement.title }}</h2>
          <p class="greysubtitle">{{ achievement.description }}</p>
        </div>
        <span class="progress-text">({{ achievement.current }}/{{ achievement.goal }})</span>
      <ProgressBar :value="achievement.progress" id = "inprogressbar" />
      </div>
    </div>
</div>
</div>
  </template>
  <script>
  import ProgressBar from './ProgressBar.vue';
  
  export default {
    components: {
      ProgressBar
    },
    data() {
      return {
        achievements: [
          {
            id: 1,
            title: 'Master User',
            description: 'Total Study Time Reached 200 hrs',
            icon: 'useraward.png', // Ensure this is the correct relative path
            current: 200,
            goal: 200,
          },
          {
            id: 2,
            title: 'Leaderboard Novice',
            description: 'Place Top 3 in Your Monthly Leaderboard Once',
            icon: 'leaderaward.png', // Ensure this is the correct relative path
            current: 4,
            goal: 1,
          },{
            id: 3,
            title: 'Leaderboard Competitor',
            description: 'Place Top 3 in Your Monthly Leaderboard 5 times',
            icon: 'leaderaward.png', // Ensure this is the correct relative path
            current: 4,
            goal: 5,
          },
          {
            id: 4,
            title: 'Leaderboard Legend',
            description: 'Place Top 3 in Your Monthly LeaderBoard 10 times',
            icon: 'leaderaward.png', // Ensure this is the correct relative path
            current: 6,
            goal: 10,
          }
          // ... more achievements
        ]
      };
    },
    computed: {
    // Computed property that adds the progress calculation
    
    inProgressAchievements() {
      return this.achievements.filter(achievement => achievement.current < achievement.goal).map(achievement => ({
        ...achievement,
        progress: (achievement.current / achievement.goal) * 100,
      }));
    },
    completedAchievements() {
      return this.achievements.filter(achievement => achievement.current >= achievement.goal).map(achievement => ({
        ...achievement,
        progress: (achievement.current / achievement.goal) * 100,
      }));
    },
  },
};
  </script>
  <style>
  .achievementpage{
display: flex;
flex-direction: column;
width: 100%;
height: 1000vh;
background: #4D003C;
box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  }
#SignOut{
    float: right;
    width: 162px;
    height: 49px;
margin-left: auto;
font-family: 'Space Grotesk';
font-style: normal;
font-weight: 700;
font-size: 24px;
line-height: 31px;
text-align: center;
background-color: transparent;
border: none;
color: #FFFFFF;
  }
#myachievementsheader{
width: 700px;
height: 82px;
font-family: 'Lucida Sans';
font-style: normal;
font-weight: 700;
font-size: 64px;
line-height: 82px;
text-align: center;
text-transform: capitalize;
color: #FFFFFF;
display:flex;
margin-left: auto;
margin-right: auto;
}
#viewallcontainer{
    margin-left: auto;
    margin-right: 5vw;
}
#viewallbutton{
width: 164px;
height: 33px;
background: #AE76A1;
box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
border-radius: 50px;
font-family: 'Lucida Sans';
font-style: normal;
font-weight: 700;
font-size: 24px;
line-height: 31px;
text-align: center;
color: #FFFFFF;
}
#arrowdownimg{
position: absolute;
width: 25px;
height: 17px;
left: 1445px;
top: 145px;
background-size: 25px ;
}
  #AchievementCompletedContainer{
width: 90vw;
margin-left:auto;
margin-right: auto;
background: #B857A1;
box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
border-radius: 10px;
overflow-y: auto;
overflow-x: auto;
margin-bottom: 10px;
  }
  #AchievementsCompletedHeader{
width: 586px;
height: 62px;
font-family: 'Lucida Sans';
font-style: normal;
font-weight: 700;
font-size: 32px;
line-height: 41px;
text-transform: capitalize;
color: #FFFFFF;
}
  #Achievementunlocked {
    display: flex;
    align-items: center;
  width: 100%; /* Set to the desired width or max-width */
  background-color: #B857A1; /* The purple background color */
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); /* Box shadow for depth */
  flex-direction: row;
}
.achievementcompleted-icon{
    width: 100px; /* Example width */
  height: auto; /* Maintain aspect ratio */
  margin-right: 20px;
}
.achievementscompleted-details{
    flex-grow: 20; /* Makes the detail container take up the remaining space */
  text-align: right;
  flex-direction: column; 
}
.title{
width: 700px;
height: 53px;
font-family: 'Lucida Sans';
font-style: normal;
font-weight: 700;
font-size: 32px;
line-height: 41px;
text-transform: capitalize;
color: #FFFFFF;
}
.subtitle{
 margin-top: -15px;
width: 700px;
height: 53px;
font-family: 'Lucida Sans';
font-style: normal;
font-weight: 400;
font-size: 20px;
line-height: 31px;
text-transform: capitalize;
color: #FFFFFF;
}
.progresscompleted-text{
    margin-left: 14vw;
width: 700px;
height: 39px;
font-family: 'Lucida Sams';
font-style: normal;
font-weight: 700;
font-size: 30px;
line-height: 38px;
text-align: center;
text-decoration-line: underline;
text-transform: uppercase;
color: #11DD11;
text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
}


  #AchievementsInProgContainer {
    width: 90vw;
    height: 50vh;
    margin-left: auto;
    margin-right: auto;
    background: #CDAEC7;
    overflow-y: auto;
    border-radius: 10px;
}
#AchievementsInProgHeader{
height: 62px;
font-family: 'Lucida Sans';
font-style: normal;
font-weight: 700;
font-size: 32px;
line-height: 41px;
text-transform: capitalize;
color: #FFFFFF;
}
.achievement-in-progress{
    display: flex;
    align-items: center;
  flex-direction: row;

}
.achievementinprog-icon{
    width: 100px; /* Example width */
  height: 85px; /* Maintain aspect ratio */
  margin-right: 20px;
}
.progress-text{
    margin-left: 26vw;
    margin-right: 1vw;
    
}
#inprogressbar{
    margin-left: auto;
    margin-right: 1vw;
    min-width: 100px;
}
.greytitle {
width: 700px;
height: 53px;
font-family: 'Lucida Sans';
font-style: normal;
font-weight: 700;
font-size: 32px;
text-transform: capitalize;
color: #474242;
}
.greysubtitle {
width: 700px;
height: 53px;
margin-top: -15px;
font-family: 'Lucida Sans';
font-style: normal;
font-weight: 400;
font-size: 20px;
text-transform: capitalize;
color: #474242;
}
  </style>

