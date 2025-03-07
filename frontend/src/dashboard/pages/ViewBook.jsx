import { Box } from "@mui/material"
import Grid from '@mui/material/Grid2';
import { useBooks } from "../../hooks";

export const ViewBook = () => {

  const { book } = useBooks();

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Grid
        container
        spacing={1}
      >
        <Grid
            item
            size={12}
            sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
            }}
        >
            <iframe
              src={book.pdfUrl}
              width="100%"
              height="800px"
              title={book.title}
            />
        </Grid>
      </Grid>
    </Box>    
  )
}
