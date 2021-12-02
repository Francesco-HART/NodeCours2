import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { CardContent, Card, IconButton, Button } from "@mui/material";
import ModeIcon from "@mui/icons-material/Mode";
import useUsers from "./useUsers";

export default function Users() {
  const blocUsers = useUsers();

  return (
    <Card>
      <CardContent>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="caption table">
            <caption>
              <Button onClick={blocUsers.navigateToHome}>Retour</Button>
            </caption>
            <TableHead>
              <TableRow>
                <TableCell>Email</TableCell>
                <TableCell align="right">Nom</TableCell>
                <TableCell align="right">Type</TableCell>
                <TableCell align="right">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {blocUsers.users.map((user) => (
                <TableRow key={user.name}>
                  <TableCell component="th" scope="user">
                    {user.email}
                  </TableCell>
                  <TableCell align="right"> {user.name}</TableCell>
                  <TableCell align="right"> {user.type}</TableCell>
                  <TableCell align="right">
                    <IconButton
                      onClick={() => blocUsers.navigateToUpdateOneUser(user.id)}
                    >
                      <ModeIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </CardContent>
    </Card>
  );
}
