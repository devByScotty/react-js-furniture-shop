import React, { useState } from 'react';
import { Box, FormControl, FormControlLabel, Checkbox, Button, Select, MenuItem, InputLabel } from '@mui/material';

const FilterSort = ({ products, setFilteredProducts }) => {
  const [filters, setFilters] = useState({});
  const [sort, setSort] = useState('');

  const handleFilterChange = (e) => {
    const { name, checked } = e.target;
    setFilters({
      ...filters,
      [name]: checked,
    });
  };

  const handleSortChange = (e) => {
    const sortValue = e.target.value;
    setSort(sortValue);

    const sortedProducts = [...products].sort((a, b) => {
      if (sortValue === 'price') return a.price - b.price;
      if (sortValue === 'popularity') return b.popularity - a.popularity;
      return 0;
    });

    setFilteredProducts(sortedProducts);
  };

  return (
    <Box sx={{ padding: 2 }}>
      <Typography variant="h6">Filter by Categories</Typography>
      <FormControlLabel control={<Checkbox name="category1" onChange={handleFilterChange} />} label="Category 1" />
      <FormControlLabel control={<Checkbox name="category2" onChange={handleFilterChange} />} label="Category 2" />
      <FormControlLabel control={<Checkbox name="category3" onChange={handleFilterChange} />} label="Category 3" />

      <FormControl fullWidth sx={{ marginTop: 2 }}>
        <InputLabel>Sort By</InputLabel>
        <Select value={sort} onChange={handleSortChange}>
          <MenuItem value="price">Price</MenuItem>
          <MenuItem value="popularity">Popularity</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
};

export default FilterSort;
