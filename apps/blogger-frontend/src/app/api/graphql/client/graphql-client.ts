import {GraphQLClient} from "graphql-request";
import {environment} from "../../../../environments/environment";

const graphqlClient = new GraphQLClient(environment.graphqlUrl);

export default graphqlClient;
