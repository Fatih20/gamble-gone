import { mockUsers } from "./users";
import { type Posts } from "@/types/posts";

const loremIpsum = `
Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam ipsum quam, tincidunt vel auctor in, rhoncus vitae orci. Cras nibh turpis, consectetur et nisl non, auctor aliquet mauris. Nulla rhoncus justo id sapien fringilla, eget maximus augue bibendum. Vivamus sem lacus, suscipit ac risus vitae, convallis iaculis mauris. Maecenas eu gravida sem. In iaculis sapien non sem bibendum blandit. Sed blandit, est id efficitur pharetra, lorem dui tempor mi, eget tincidunt est orci vitae orci. Aliquam quis rhoncus est. In et erat non orci lacinia rutrum.

Nulla nec quam ut ex mollis posuere sed vitae leo. Praesent tempor augue risus, eget cursus risus lobortis vitae. Curabitur sollicitudin diam nec accumsan gravida. Nulla lacinia risus quis odio fringilla, at congue felis ullamcorper. Suspendisse tincidunt auctor commodo. Quisque vehicula aliquam malesuada. Vivamus aliquet ipsum ac felis condimentum, non viverra erat euismod. Aliquam erat volutpat. Aenean mattis consequat purus sed hendrerit. Integer sed sagittis erat.

Nullam a vestibulum justo. Cras aliquam accumsan vehicula. Cras quis tellus a augue fermentum sollicitudin. In aliquet feugiat lectus ut consectetur. Nunc varius laoreet enim. Sed ipsum sem, pulvinar in elit et, fermentum placerat lorem. Pellentesque eget augue leo. In dictum risus pulvinar dolor mattis sollicitudin. Fusce pharetra nec lorem ac pulvinar. Aenean dictum, sapien sit amet accumsan posuere, purus magna placerat ante, vitae posuere nisi purus sit amet turpis. Vivamus in arcu quis nisi pretium tincidunt in eget dui. Maecenas in tincidunt sem, vel laoreet ante. Aliquam euismod hendrerit est ac laoreet. Ut in porta magna, sed pharetra elit. Suspendisse condimentum dui in tortor malesuada, sed lobortis erat consequat.

Nullam id condimentum velit. Quisque vel commodo est. Etiam iaculis, nisl nec dignissim faucibus, nibh ante facilisis elit, vitae iaculis ex nisi nec nibh. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Etiam eget leo in quam rutrum euismod. Aliquam erat nibh, porta ac commodo ut, scelerisque a mi. Ut non blandit nunc. Quisque quis molestie diam. Donec laoreet interdum turpis ut lobortis. Suspendisse semper commodo metus, a scelerisque tellus volutpat sit amet. Maecenas malesuada diam ut lectus maximus, eu tincidunt turpis condimentum. Nam pulvinar vitae lectus ac vulputate. Etiam elit ligula, molestie in ex ultricies, euismod pretium velit. Duis rhoncus, sem ut dictum tincidunt, libero tellus lobortis nisl, eu sollicitudin lacus orci in orci. Nam vitae sodales massa.

Aenean rhoncus diam tellus, ut elementum erat scelerisque eget. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Duis sit amet vestibulum erat. Curabitur posuere eros sit amet ante viverra, tincidunt vestibulum nulla condimentum. Mauris mattis, elit at pulvinar suscipit, diam diam euismod risus, nec mattis eros felis eget enim. Proin pulvinar nunc vel neque porttitor, et euismod nibh dictum. Donec hendrerit turpis felis, tincidunt viverra nibh efficitur sit amet. Sed pulvinar eros in justo egestas, in facilisis odio aliquet. Fusce posuere lobortis rhoncus. Proin mattis felis sit amet eleifend placerat. In fermentum metus dui, a posuere ex laoreet ut. Nam eu sem nec lectus varius ultrices et eu lacus. Sed porta urna eget erat accumsan, id gravida mi consectetur. Fusce id libero nec purus aliquam lobortis et ac tellus. Aenean malesuada dapibus mollis. Praesent vestibulum dolor eu rhoncus vulputate.
`;

export const mockPosts: Posts[] = [
  {
    id: "p1",
    title: "Introduction to TypeScript",
    content: loremIpsum,
    createdBy: null,
    createdAt: new Date(),
  },
  {
    id: "p2",
    title: "Advanced JavaScript Techniques",
    content: loremIpsum,
    createdBy: mockUsers[1],
    createdAt: new Date(),
  },
  {
    id: "p3",
    title: "Understanding Async/Await",
    content: loremIpsum,
    createdBy: mockUsers[2],
    createdAt: new Date(),
  },
  {
    id: "p4",
    title: "CSS Grid Layout",
    content: loremIpsum,
    createdBy: mockUsers[3],
    createdAt: new Date(),
  },
  {
    id: "p5",
    title: "Responsive Web Design",
    content: loremIpsum,
    createdBy: mockUsers[4],
    createdAt: new Date(),
  },
  {
    id: "p6",
    title: "Getting Started with React",
    content: loremIpsum,
    createdBy: null,
    createdAt: new Date(),
  },
  {
    id: "p7",
    title: "Building REST APIs with Node.js",
    content: loremIpsum,
    createdBy: mockUsers[1],
    createdAt: new Date(),
  },
  {
    id: "p8",
    title: "State Management with Redux",
    content: loremIpsum,
    createdBy: mockUsers[2],
    createdAt: new Date(),
  },
  {
    id: "p9",
    title: "Introduction to Docker",
    content: loremIpsum,
    createdBy: mockUsers[3],
    createdAt: new Date(),
  },
  {
    id: "p10",
    title: "Microservices Architecture",
    content: loremIpsum,
    createdBy: mockUsers[4],
    createdAt: new Date(),
  },
  {
    id: "p11",
    title: "GraphQL Basics",
    content: loremIpsum,
    createdBy: null,
    createdAt: new Date(),
  },
  {
    id: "p12",
    title: "Web Security Best Practices",
    content: loremIpsum,
    createdBy: mockUsers[1],
    createdAt: new Date(),
  },
  {
    id: "p13",
    title: "Introduction to Machine Learning",
    content: loremIpsum,
    createdBy: mockUsers[2],
    createdAt: new Date(),
  },
  {
    id: "p14",
    title: "Data Structures in Python",
    content: loremIpsum,
    createdBy: mockUsers[3],
    createdAt: new Date(),
  },
  {
    id: "p15",
    title: "Algorithms 101",
    content: loremIpsum,
    createdBy: mockUsers[4],
    createdAt: new Date(),
  },
];
