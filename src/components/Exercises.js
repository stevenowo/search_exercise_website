import React, {useEffect, useState} from 'react';
import Pagination from '@mui/material/Pagination';
import { Box, Stack, Typography} from '@mui/material';
import { exerciseOptions, fetchData } from '../utils/fetchData';
import ExerciseCard from './ExerciseCard';

const Exercises = ({exercises, setExercises, bodyPart}) => {
    const [currentPage, setCurrentPage] = useState(1);
    const [exercisePerPage] = useState(6);


    useEffect(() => {
        const fetchExercisesData = async () => {
          let exercisesData = [];
    
          if (bodyPart === 'all') {
            exercisesData = await fetchData('https://exercisedb.p.rapidapi.com/exercises', exerciseOptions);
          } else {
            exercisesData = await fetchData(`https://exercisedb.p.rapidapi.com/exercises/bodyPart/${bodyPart}`, exerciseOptions);
          }
    
          setExercises(exercisesData);
        };
    
        fetchExercisesData();
      }, [bodyPart]);

    // pagination
    const indexOfLastExercise = currentPage * exercisePerPage;
    const indexOfFirstExercise = indexOfLastExercise - exercisePerPage
    const currentExercises = exercises.slice(indexOfFirstExercise, indexOfLastExercise)

    const paginate = (event,value) => {
        setCurrentPage(value)
        window.scrollTo({top: 1800, behavior: 'smooth'})
    }

    
    return (
       <Box
       sx = {{mt: {lg: '100px'}}}
       mt = "50px"
       p = '20px'
       >
        <Typography
            variant = 'h3' mb = '46px'
        >
            Showing Results
        </Typography>
        <Stack direction="row" sx={{ gap: { lg: '107px', xs: '50px' } }} flexWrap="wrap" justifyContent="center">
            {currentExercises.map((exercise, index)=> (
                <ExerciseCard
                key = {index}
                exercise = {exercise}
                >
                </ExerciseCard>
                 
            ))}
        </Stack>
        <Stack mt = "100px" alignItems='center'>
            {exercises.length > 9 && (
                <Pagination color = 'standard' shape = 'rounded'
                defaultPage = {1} 
                count = {Math.ceil(exercises.length / exercisePerPage)}
                page = {currentPage}
                onChange= {paginate}
                size = 'large'
                />
            )}

        </Stack>


       </Box>
    )
}

export default Exercises
