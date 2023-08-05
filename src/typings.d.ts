export type ProjectList = {
	projects: Project[]
}

export type Project = {
	description: string
	images: string[]
	nameRepository: string
	techs: string[]
	title: string
	urlPage: string
}
