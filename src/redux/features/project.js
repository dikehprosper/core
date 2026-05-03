import {createSlice} from "@reduxjs/toolkit";


const initialState = {
  projects: [],
  allProjects: [],
};

const projectSlice = createSlice({
  name: "project",
  initialState,
  reducers: {
    setProjects: (state, action) => {
      state.projects = action.payload;
    },
    clearProjects: (state) => {
      state.projects = [];
    },
    // Action to set all projects
    setAllProjects: (state, action) => {
      state.allProjects = action.payload;
    },
  },
});

export const {setProjects, clearProjects, setAllProjects} = projectSlice.actions;
export default projectSlice.reducer;
