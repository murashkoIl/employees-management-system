import { SearchBox } from "@components/SearchBox";
import { Stack } from "@mui/system";
import { ListItemType, ListProps } from "./List.types";
import {
  List as MuiList,
  ListItem,
  ListItemButton,
  ListItemText,
} from "@mui/material";
import { useCallback, useState } from "react";
import { Link } from "react-router-dom";

export const List = ({ items }: ListProps) => {
  const [filter, setFilter] = useState("");

  const handleFilter = useCallback((query: string) => {
    setFilter(query);
  }, []);

  return (
    <Stack>
      <SearchBox onQuery={handleFilter} queryValue={filter} />
      <MuiList>
        {items
          .filter((item: ListItemType) =>
            item.name.toLowerCase().includes(filter.toLowerCase()),
          )
          .map((item) => (
            <ListItem key={item.name} disablePadding>
              {item.link ? (
                <ListItemButton component={Link} to={item.link}>
                  <ListItemText primary={item.name} />
                </ListItemButton>
              ) : (
                <ListItemText primary={item.name} />
              )}
            </ListItem>
          ))}
      </MuiList>
    </Stack>
  );
};
