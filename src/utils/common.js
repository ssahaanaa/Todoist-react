const priorityOptions = [{
    label: 'High',
    value: 'high',
    id: crypto.randomUUID()
},{
    label: 'Medium',
    value: 'medium',
    id: crypto.randomUUID()
},{
    label: 'Low',
    value: 'low',
    id: crypto.randomUUID()
}];

const tagOptions = [{
    label: 'React',
    value: 'react',
    id: crypto.randomUUID()
},{
    label: 'Front End',
    value: 'front-end',
    id:crypto.randomUUID()
},{
    label: 'Back End',
    value: 'back-end',
    id:crypto.randomUUID()
},{
    label: 'Full Stack',
    value: 'full-stack',
    id:crypto.randomUUID()
},{
    label: 'AI-ML',
    value: 'AI-ML',
    id:crypto.randomUUID()
}];

export { priorityOptions, tagOptions };