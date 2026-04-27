import {createSlice, PayloadAction} from "@reduxjs/toolkit";


interface ProjectState {
  projects: any[]; // Use a proper type if you have one
  allProjects: any[];
}

const initialState: ProjectState = {
  projects: [],
  allProjects: [],
};

const projectSlice = createSlice({
  name: "project",
  initialState,
  reducers: {
    setProjects: (state, action: PayloadAction<any[]>) => {
      state.projects = action.payload;
    },
    clearProjects: (state) => {
      state.projects = [];
    },
    // Action to set all projects
    setAllProjects: (state, action: PayloadAction<any[]>) => {
      state.allProjects = action.payload;
    },
  },
});

export const {setProjects, clearProjects, setAllProjects} = projectSlice.actions;
export default projectSlice.reducer;
