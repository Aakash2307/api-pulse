export type Environment = 'local' | 'production';

export interface ApiDefinition {
    id :string;
    name: string;
    url: string;
    method: string;
    environment: Environment;
    expectedStatus: number;
    timeout: number;
}