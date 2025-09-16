import AddMovies from "../../admComponents/Movies/addMovie";
import DeleteMovies from "../../admComponents/Movies/deleteMovie";

import AddSession from "../../admComponents/Sessions/addSession";
import DeleteSession from "../../admComponents/Sessions/deleteSession";
export default function AdminDashboard() {
  return (
    <>
      <AddMovies />
      <DeleteMovies />
      <AddSession />
      <DeleteSession />
    </>
  );
}
