export default function (req, res) {
  let topics = ["Data", "Science", "Animals"];

  res.status(200).json(topics);
}
