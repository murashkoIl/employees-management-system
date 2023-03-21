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
import { useTranslation } from "react-i18next";

export const List = ({ items }: ListProps) => {
  const [filter, setFilter] = useState("");
  const { t } = useTranslation();

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
                  <ListItemText
                    primary={t(`entitiesPage.entities.${item.name}`)}
                  />
                </ListItemButton>
              ) : (
                <ListItemText
                  primary={t(`entitiesPage.entities.${item.name}`)}
                />
              )}
            </ListItem>
          ))}
      </MuiList>
    </Stack>
  );
};
