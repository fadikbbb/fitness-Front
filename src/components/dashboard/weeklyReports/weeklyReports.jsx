function WeeklyReports() {
  const weeklyReports = [
    {
      user: "John Doe",
      date: "October 1 - October 7",
      totalWorkouts: 5,
      averageWorkoutDuration: 45, // in minutes
      caloriesBurned: 2000, // in kcal
      goalsAchieved: ["Completed 3 strength training sessions", "Ran 10 km"],
      feedback: "User reported feeling more energized.",
    },
    {
      user: "Jane Smith",
      date: "October 8 - October 14",
      totalWorkouts: 6,
      averageWorkoutDuration: 50, // in minutes
      caloriesBurned: 2300, // in kcal
      goalsAchieved: [
        "Attended 2 yoga classes",
        "Increased weight in strength training by 5%",
      ],
      feedback: "User expressed satisfaction with improvements in flexibility.",
    },
    {
      user: "Alex Brown",
      date: "October 15 - October 21",
      totalWorkouts: 4,
      averageWorkoutDuration: 40, // in minutes
      caloriesBurned: 1500, // in kcal
      goalsAchieved: [
        "Completed 2 cycling sessions",
        "Maintained hydration levels consistently",
      ],
      feedback: "User noted fatigue and plans to adjust workout schedule.",
    },
    {
      user: "Emily White",
      date: "October 22 - October 28",
      totalWorkouts: 5,
      averageWorkoutDuration: 55, // in minutes
      caloriesBurned: 2100, // in kcal
      goalsAchieved: [
        "Joined a running group",
        "Improved 5k run time by 3 minutes",
      ],
      feedback: "User reported enjoying group workouts.",
    },
    {
      user: "Michael Green",
      date: "October 29 - November 4",
      totalWorkouts: 3,
      averageWorkoutDuration: 30, // in minutes
      caloriesBurned: 1200, // in kcal
      goalsAchieved: [
        "Focused on recovery sessions",
        "Tried new meditation techniques",
      ],
      feedback: "User felt relaxed but missed higher intensity workouts.",
    },
    {
      user: "Sarah Blue",
      date: "November 5 - November 11",
      totalWorkouts: 7,
      averageWorkoutDuration: 60, // in minutes
      caloriesBurned: 2500, // in kcal
      goalsAchieved: [
        "Completed a full-body workout challenge",
        "Attended 3 dance classes",
      ],
      feedback: "User reported increased motivation and enjoyment in workouts.",
    },
  ];

  return (
    <div className="max-w-4xl mx-auto p-8 bg-white rounded-xl shadow-lg">
      <h1 className="font-sans text-xl text-center">weekly reports</h1>
      <div >
      {weeklyReports.map((weeklyReport) => (
        <div className="bg-gray-200 p-2 m-2">
          <p>{weeklyReport?.averageWorkoutDuration}</p>
          <p>{weeklyReport.caloriesBurned}</p>
          <p>{weeklyReport.date}</p>
          <p>{weeklyReport.feedback}</p>
          {weeklyReport.goalsAchieved.map((goal) => (
            <li>{goal}</li>
          ))}
          <p>{weeklyReport.totalWorkouts}</p>
        </div>
        ))}
      </div>
    </div>
  );
}
export default WeeklyReports;
