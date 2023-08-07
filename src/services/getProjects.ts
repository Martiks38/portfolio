import projectdb from '../db/projects.json'

import type { Project } from '@/typings'

export async function getProjects(): Promise<Project[]> {
	return new Promise((resolve) => {
		const projects = projectdb.projects.map(
			({ description, imgs, name_repository, techs, title, url_page }) => {
				return {
					description: description,
					images: {
						imageList: imgs.list,
						presentationImage: imgs.presentation_image
					},
					nameRepository: name_repository,
					techs,
					title,
					urlPage: url_page
				}
			}
		)

		return resolve(projects)
	})
}
