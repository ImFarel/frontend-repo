"use client";

import React, { useState } from 'react'
import { Card, CardContent, CircularProgress, Container, Grid, List, ListItem, ListItemText, Typography } from '@mui/material';
import UpdateUserForm from '@/components/UpdateUser';
import { useGetUsersQuery } from '@/lib/features/users/usersApiSlice';

const OPTIONS = [5, 10, 15];

export default function Users() {
	const [limit, setLimit] = useState(5)
	const { data, isError, isLoading, isSuccess } = useGetUsersQuery(limit)
	console.log(data)
	if (isError) {
		return (
			<Container>
				<Typography variant="h4" color="error" gutterBottom>
					There was an error!!!
				</Typography>
			</Container>
		);
	}
	if (isLoading) {
		return (
			<Container>
				<CircularProgress />
			</Container>
		);
	}
	if (isSuccess) {

		return (
			<Container>
				<Typography variant="h4" gutterBottom>
					Users
				</Typography>
				<Grid container spacing={2}>
					{data.users.map((user) => (
						<Grid item xs={12} sm={6} md={4} key={user.id}>
							<Card>
								<CardContent>
									<Typography variant="h5" component="div">
										{user.name}
									</Typography>
									<List>
										<ListItem>
											<ListItemText primary="Email" secondary={user.email} />
										</ListItem>
										<ListItem>
											<ListItemText primary="ID" secondary={user.id} />
										</ListItem>
									</List>
									<UpdateUserForm user={user} />
								</CardContent>
							</Card>
						</Grid>
					))}
				</Grid>
			</Container>
		)
	}
}