export default interface Blueprint {
    id: string,
    createdDate: string,
    createdBy: string,
    lifeCycleStage: string,
    tags: string[],
    version: string,
    lastModifiedDate: string,
    nodes: Node[]
}

export interface Node {
    id: string,
    parentId: string,
    title: string,
    type: string,
    nodeLevel: number | 0,
    properties: NodeProperty[],
    children: string[]
}

export interface NodeProperty {
    id: string,
    title: string,
    type: string,
    required: boolean | true,
    description: string,
    example: string,
    pattern: string,
    const: boolean |true,
    default: string,
    properties: string[]
}