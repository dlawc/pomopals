<template>
  <div class="xpBar">
    <table id="table">
      <tr>
        <th id="currentXPHeader">Current XP</th>
        <th id="totalXPHeader">Total XP</th>
      </tr>
      <tr>
        <td id="currentXP">###</td>
        <td id="totalXP">$$$</td>
      </tr>
    </table>
  </div>
</template>

<script>
export default {
  name: "XpBar",
  components: {},
};
</script>

<style scoped>
.xpBar {
  width: 100%;
  display: flex;
  justify-content: center;
  margin-top: 20px;
}

#table {
  width: 60%;
  border-collapse: collapse;
  margin-top: 10vh;
}

#table th,
#table td {
  border: 1px solid #ddd;
  text-align: left;
  padding: 8px;
}

#table th {
  background-color: #f2f2f2;
  color: black;
}
</style>
