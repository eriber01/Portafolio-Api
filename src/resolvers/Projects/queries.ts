export const GET_PROJECTS =  `
select p.id, p.name, p.descriptions, p.url, 
p.git_url "gitUrl", p.img, p.enabled
from portafolio.projects p
order by name
`

export const GET_TECH_PROJECTS = `
select pt.id "techId", t."name", t.id id, t.url
from portafolio.technologies t
join portafolio.project_techs pt on pt.tech_id = t.id
where pt.project_id = $1
`