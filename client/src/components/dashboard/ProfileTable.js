import React from "react";

const ProfileTable = ({ handle, country, status, skills, date, bio }) => {
  return (
    <div className="profile mt-5">
      <h2>Informations:</h2>
      <table class="table">
        <thead>
          <tr>
            <th>pseudo</th>
            <th>country</th>
            <th>status</th>
            <th>skills</th>
            <th>date</th>
            <th>bio</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{handle}</td>
            <td>{country}</td>
            <td>{status}</td>
            <td>{skills}</td>
            <td>{date}</td>
            <td>{bio}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default ProfileTable;
