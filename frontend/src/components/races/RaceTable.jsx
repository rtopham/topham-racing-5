import React from 'react'
import RaceRow from './RaceRow'
import Table from 'react-bootstrap/Table'

const RaceTable = ({ races, stravaProfile, checkTokens, editMode }) => {
  return (
    <>
      <Table size='sm' striped bordered hover>
        <thead>
          <tr>
            <th>Series</th>
            <th>Name</th>
            <th>Date</th>
            <th>Category</th>
            <th>Time</th>
            <th>Rank</th>
          </tr>
        </thead>
        <tbody>
          {races.map((race) => (
            <RaceRow
              key={race._id}
              race={race}
              stravaProfile={stravaProfile}
              checkTokens={checkTokens}
              editMode={editMode}
            />
          ))}
        </tbody>
      </Table>
    </>
  )
}

export default RaceTable
