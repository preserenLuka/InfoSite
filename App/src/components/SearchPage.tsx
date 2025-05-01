import {
  Autocomplete,
  TextField,
  Box,
  CircularProgress,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { getPlaceholderData } from "../utils/Placeholder";
import { flattenTopics, SearchOption } from "../utils/flattenTopics";
import { TopicList } from "../utils/types";

const SearchPage = () => {
  const [options, setOptions] = useState<SearchOption[]>([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState<SearchOption | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const data: TopicList = await getPlaceholderData();
      const flat = flattenTopics(data);
      setOptions(flat);
      setLoading(false);
    };
    fetchData();
  }, []);

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        transform: "translateY(-12%)",
      }}
    >
      {loading ? (
        <CircularProgress />
      ) : (
        <Autocomplete
          disablePortal
          options={options}
          getOptionLabel={(option) => option.title}
          value={selected}
          onChange={(event, newValue) => setSelected(newValue)}
          sx={{ width: 600 }}
          renderOption={(props, option) => (
            <Box
              component="li"
              {...props}
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                width: "100%",
                pr: 2,
                pl: 1,
                py: 1,
              }}
            >
              <Typography variant="body1" sx={{ flexGrow: 1 }}>
                {option.title}
              </Typography>
              <Typography
                variant="caption"
                sx={{ color: "gray", whiteSpace: "nowrap" }}
              >
                {option.type}
              </Typography>
            </Box>
          )}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Search Data"
              placeholder="Search..."
              variant="outlined"
            />
          )}
        />
      )}
    </Box>
  );
};

export default SearchPage;
