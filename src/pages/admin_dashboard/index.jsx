import AddMovies from "../../admComponents/Movies/addMovie";
import DeleteMovies from "../../admComponents/Movies/deleteMovie";

import AddSession from "../../admComponents/Sessions/addSession";
import DeleteSession from "../../admComponents/Sessions/deleteSession";
export default function AdminDashboard() {
  return (
    <>
      <h1>Filmes</h1>
      <AddMovies />
      <DeleteMovies />
      <h1>Sessões</h1>
      <AddSession />
      <DeleteSession />
    </>
  );
}
