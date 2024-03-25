<template> 
    <div class = "AchievementPage">
        <div id = "SignOutTab">
            <button id = "SignOut" type = "button">Sign Out</button> 
        </div>
        <div id = "MyAchievementsTab">
            <h1 id = "MyAchievements"> My Achievements </h1>
        </div>
        <div id = "ViewAllTab">
            <button id = "ViewAllButton" type = "button"> View All</button>
            <image src = https://parspng.com/wp-content/uploads/2021/11/arrowpng.parspng.com-13.png id = "arrowdown"> </image>
        </div>
        <div id = "AchievementsUnlockedTab">
            <h1 id = "AchievementsUnlocked"> Achievements Unlocked </h1>
            <image src = "useraward.png" id = "useraward"></image>
            <image src = "leaderaward.png" id = "leaderaward"></image>
            <h1 class = "title" id = "NoviceUser"> Novice User</h1>
            <h1 class = "subtitle" id = "studytimelvl1">Total Study Time Reached 24hrs</h1>
            <h1 class = "title" id = "leaderboardlvl1"> Leaderboard Competitor</h1>
            <h1 class = "subtitle" id = "top3lvl1"> Place Top 3 in Your Monthly LeaderBoard Once</h1>
            <h1 class = "challengetitle" id = "challenge1" > Challenge Complete </h1>
            <h1 class = "challengetitle" id = "challenge2"> Challenge Complete </h1>
        </div>
        <div id = "AchievementsInProgTab">
            <h1 id = "AchievementsInProg"> Achievements In-Progress</h1>
            <image src = "greyuseraward.png" id = "greyuseraward"></image>
            <image src = "greyleaderaward.png" id = "greyleaderaward"></image>
            <h1 class = "greytitle" id = "Userlvl2"> Master User</h1>
            <h1 class = "greysubtitle" id = "studytimelvl2">Total Study Time Reached 200 hrs</h1>
            <h1 class = "greytitle" id = "leaderboardlvl2"> Leaderboard Expert</h1>
            <h1 class = "greysubtitle" id = "top3lvl2"> Place Top 3 in Your Monthly LeaderBoard 5 times</h1>
        </div>              
    </div>
    <div id = "buttonContainer"> 
        <button id = "homebutton" type = "button"></button>
        <button id = "leaderboardbutton" type = "button"></button>
        <button id = "friendsbutton" type = "button"></button>
        <button id = "achievementbutton" type = "button"></button>
        <button id = "urlbutton" type = "button"></button>
    </div>
    
</template>

<style>

.AchievementPage{
    position: absolute;
width: 1280px;
height: 832px;
left: 0px;
top: 0px;
background: #4D003C;
box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
}

#SignOut{
position: absolute;
width: 162px;
height: 49px;
left: 1089px;
top: 33px;
font-family: 'Lucida Sans';
font-style: normal;
font-weight: 700;
font-size: 24px;
line-height: 31px;
text-align: center;
color: #FFFFFF;
border: none;
background: 0
}

#MyAchievements{
position: absolute;
width: 546px;
height: 82px;
left: 377px;
top: 79px;
font-family: 'Lucida Sans';
font-style: normal;
font-weight: 700;
font-size: 60px;
line-height: 82px;
text-align: center;
text-transform: capitalize;
color: #FFFFFF;
}

#ViewAllButton{
position: absolute;
width: 164px;
height: 33px;
left: 1027px;
top: 136px;
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

#arrowdown{
position: absolute;
width: 25px;
height: 17px;
left: 1030px;
top: 148px;
background-size: 25px ;
}

#AchievementsUnlockedTab {
position: absolute;
width: 1095px;
height: 292px;
left: 99px;
top: 192px;
background: #B857A1;
box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
border-radius: 10px;
}

#AchievementsUnlocked{
position: absolute;
width: 400px;
height: 62px;
left: 20px;
top: 20px;
font-family: 'Lucida Sans';
font-style: normal;
font-weight: 700;
font-size: 32px;
line-height: 41px;
text-align: center;
text-transform: capitalize;
color: #FFFFFF;
}

#AchievementsInProgTab{
position: absolute;
width: 1095px;
height: 283px;
left: 99px;
top: 501px;
background: #CDAEC7;
box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
border-radius: 10px;
}

#AchievementsInProg{
position: absolute;
width: 450px;
height: 62px;
left: 20px;
top: 20px;
font-family: 'Lucida Sans';
font-style: normal;
font-weight: 700;
font-size: 32px;
line-height: 41px;
text-align: center;
text-transform: capitalize;
color: #FFFFFF;
}

#buttonContainer{
    position: fixed; 
  top: 50%; 
  left: 2%;
  transform: translateY(-50%); 
  display: flex; 
  flex-direction: column; 
  align-items: center;
  margin-bottom: 100px;
}
#homebutton{
background: url('home.png');
}
#leaderboardbutton {
background: url('Vector.png');
}
#friendsbutton{
background: url('friends.png');
}
#achievementbutton{
    background: url('achievement.png');
}
#urlbutton{
    background: url('url.png');
}
#homebutton, #leaderboardbutton, #friendsbutton, #achievementbutton,#urlbutton {
    width: 40px; 
    height: 38px; 
    background-repeat: no-repeat;
    background-position: center; 
    background-size: contain; 
    margin-bottom: 10px; 
    border: none; 
    outline: none; 
}
#useraward{
width: 88px;
height: 76px;
margin-left: 10px;
margin-top: 70px;
margin-bottom: 100px;
}

#leaderaward{
width: 76px;
height: 80px;
margin-left: -80px;
}

.title{

font-family: 'lucida sans';
font-style: normal;
font-weight: 700;
font-size: 32px;
line-height: 41px;
text-transform: capitalize;

color: #FFFFFF;
}
#NoviceUser{
position: absolute;
width: 357px;
height: 53px;
left: 105px;
top: 65px;
}
.subtitle{
font-family: 'Lucida Sans';
font-style: normal;
font-weight: 400;
font-size: 24px;
line-height: 31px;
text-transform: capitalize;
color: #FFFFFF;
}
#studytimelvl1{
position: absolute;
width: 625px;
height: 53px;
left: 105px;
top: 105px;
}

#leaderboardlvl1{
position: absolute;
width: 410px;
height: 53px;
left: 105px;
top: 170px;
}

#top3lvl1{
position: absolute;
width: 625px;
height: 53px;
left: 105px;
top: 210px;
}

.challengetitle{

font-family: 'Lucida Sans';
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
#challenge1{
position: absolute;
width: 380px;
height: 39px;
left: 700px;
top: 80px;
}

#challenge2{
position: absolute;
width: 380px;
height: 39px;
left: 700px;
top: 190px;
}
#greyuseraward{
position: absolute;
width: 100px;
height: 76px;
left: 10px;
top: 70px;
}
#greyleaderaward{
position: absolute;
width: 70px;
height: 76px;
left: 20px;
top: 170px;
}
.greytitle{
font-family: 'Lucida Sans';
font-style: normal;
font-weight: 700;
font-size: 32px;
line-height: 41px;
text-transform: capitalize;

color: #474242;

}

.greysubtitle{
font-family: 'Lucida Sans';
font-style: normal;
font-weight: 400;
font-size: 24px;
line-height: 31px;
text-transform: capitalize;

color: #474242;
}

#Userlvl2{
position: absolute;
width: 357px;
height: 53px;
left: 105px;
top: 65px;
}

#studytimelvl2{
position: absolute;
width: 625px;
height: 53px;
left: 105px;
top: 105px;
}

#leaderboardlvl2{
    /* Leaderboard Expert */

position: absolute;
width: 396px;
height: 53px;
left: 105px;
top: 170px;
}
#top3lvl2{
position: absolute;
width: 625px;
height: 53px;
left: 105px;
top: 210px;
}

</style>

