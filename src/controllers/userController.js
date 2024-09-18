const users = [
  {
    id: "1",
    name: "Mr A",
    job: "Teacher",
    salary: 50000,
  },
  {
    id: "2",
    name: "Mr B",
    job: "Developer",
    salary: 100000,
  },
  {
    id: "3",
    name: "Mr C",
    job: "Chess Player",
    salary: 200000,
  },
];

const getAllUsers = (req, res) => {
  return res.status(200).json({
    status: "success",
    message: "get all users successfully",
    data: users,
  });
};

export { getAllUsers };
