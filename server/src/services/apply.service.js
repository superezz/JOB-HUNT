exports.autoApplyJobs = async (user) => {
  const maxPerDay = 5; // keep small for safety

  const jobsToApply = user.applyQueue.slice(0, maxPerDay);

  for (let job of jobsToApply) {
    console.log(`Applying to ${job.company}`);

    // simulate delay (important)
    await new Promise((resolve) => setTimeout(resolve, 2000));

    user.applications.push({
      ...job,
      status: "Applied",
      appliedAt: new Date(),
    });
  }

  // remove applied jobs from queue
  user.applyQueue = user.applyQueue.slice(maxPerDay);

  await user.save();
};