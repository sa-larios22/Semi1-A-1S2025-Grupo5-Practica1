import { Box } from "@mui/material"
import Grid from '@mui/material/Grid2';
import { useBooks } from "../../hooks";
import { MyBookCard } from "../components";

export const Books = () => {

  const { userBooks } = useBooks();
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Grid
        container
        spacing={1}
      >
        {
          userBooks.map((book) => (
            <Grid
              key={book.id}
              size={3}
              sx={{
                margin: '10px'
              }}
            >
              <MyBookCard
                book={book}
              />
            </Grid>
          ))
        }
      </Grid>
    </Box>    
  )
}
