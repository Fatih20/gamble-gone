import { mockUsers } from "./users";
import { type Posts } from "@/types/posts";
import { type Value } from "@udecode/plate-common";

const loremIpsumRichText: Value = [
  {
    type: "paragraph",
    children: [
      {
        text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas non felis tellus. Etiam fringilla odio ac convallis egestas. Quisque mattis nulla non nulla fermentum, at viverra sem tristique. Nulla interdum fermentum volutpat. Curabitur tempus odio vel lectus consectetur, non volutpat lectus fringilla. Aliquam ipsum mauris, vestibulum sit amet laoreet vitae, ornare id purus. Suspendisse vitae ipsum eu turpis luctus hendrerit. Aliquam erat volutpat. Ut gravida mattis lacus vitae molestie. Vivamus sit amet tristique massa. Sed aliquam volutpat est nec bibendum. Ut venenatis, libero tempor laoreet dictum, orci lacus placerat mauris, sed porttitor dolor eros et libero.",
      },
    ],
  },
  {
    type: "paragraph",
    children: [
      {
        text: "In hac habitasse platea dictumst. Proin auctor, nunc nec tincidunt ultricies, mi tellus efficitur mi, nec lacinia mi nunc et turpis. Donec at libero nec diam ultricies tempus. Nulla facilisi. Sed auctor, orci nec lacinia tincidunt, nunc turpis elementum nunc, nec ultricies risus nisl vel nunc. Donec et luctus ligula. Integer at neque in nunc lacinia tincidunt. Nam auctor, turpis sed lacinia lacinia, nunc eros fermentum mi, a gravida nisl nisi vel nisi. Nullam nec nunc nec justo tincidunt lacinia. Donec vel sapien nec nunc ultricies tincidunt",
      },
    ],
  },
];

const loremIpsumPreviewText: string = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas non felis tellus. Etiam fringilla odio ac convallis egestas. Quisque mattis nulla non nulla fermentum, at viverra sem tristique. Nulla interdum fermentum volutpat. Curabitur tempus odio vel lectus consectetur, non volutpat lectus fringilla. Aliquam ipsum mauris, vestibulum sit amet laoreet vitae, ornare id purus. Suspendisse vitae ipsum eu turpis luctus hendrerit. Aliquam erat volutpat. Ut gravida mattis lacus vitae molestie. Vivamus sit amet tristique massa. Sed aliquam volutpat est nec bibendum. Ut venenatis, libero tempor laoreet dictum, orci lacus placerat mauris, sed porttitor dolor eros et libero.`;

export const mockPosts: Posts[] = [
  {
    id: "p1",
    title: "Introduction to TypeScript",
    previewText: loremIpsumPreviewText,
    content: loremIpsumRichText,
    createdBy: null,
    createdAt: new Date(),
  },
  {
    id: "p2",
    title: "Advanced JavaScript Techniques",
    previewText: loremIpsumPreviewText,
    content: loremIpsumRichText,
    createdBy: mockUsers[1],
    createdAt: new Date(),
  },
  {
    id: "p3",
    title: "Understanding Async/Await",
    previewText: loremIpsumPreviewText,
    content: loremIpsumRichText,
    createdBy: mockUsers[2],
    createdAt: new Date(),
  },
  {
    id: "p4",
    title: "CSS Grid Layout",
    previewText: loremIpsumPreviewText,
    content: loremIpsumRichText,
    createdBy: mockUsers[3],
    createdAt: new Date(),
  },
  {
    id: "p5",
    title: "Responsive Web Design",
    previewText: loremIpsumPreviewText,
    content: loremIpsumRichText,
    createdBy: mockUsers[4],
    createdAt: new Date(),
  },
  {
    id: "p6",
    title: "Getting Started with React",
    previewText: loremIpsumPreviewText,
    content: loremIpsumRichText,
    createdBy: null,
    createdAt: new Date(),
  },
  {
    id: "p7",
    title: "Building REST APIs with Node.js",
    previewText: loremIpsumPreviewText,
    content: loremIpsumRichText,
    createdBy: mockUsers[1],
    createdAt: new Date(),
  },
  {
    id: "p8",
    title: "State Management with Redux",
    previewText: loremIpsumPreviewText,
    content: loremIpsumRichText,
    createdBy: mockUsers[2],
    createdAt: new Date(),
  },
  {
    id: "p9",
    title: "Introduction to Docker",
    previewText: loremIpsumPreviewText,
    content: loremIpsumRichText,
    createdBy: mockUsers[3],
    createdAt: new Date(),
  },
  {
    id: "p10",
    title: "Microservices Architecture",
    previewText: loremIpsumPreviewText,
    content: loremIpsumRichText,
    createdBy: mockUsers[4],
    createdAt: new Date(),
  },
  {
    id: "p11",
    title: "GraphQL Basics",
    previewText: loremIpsumPreviewText,
    content: loremIpsumRichText,
    createdBy: null,
    createdAt: new Date(),
  },
  {
    id: "p12",
    title: "Web Security Best Practices",
    previewText: loremIpsumPreviewText,
    content: loremIpsumRichText,
    createdBy: mockUsers[1],
    createdAt: new Date(),
  },
  {
    id: "p13",
    title: "Introduction to Machine Learning",
    previewText: loremIpsumPreviewText,

    content: loremIpsumRichText,
    createdBy: mockUsers[2],
    createdAt: new Date(),
  },
  {
    id: "p14",
    title: "Data Structures in Python",
    previewText: loremIpsumPreviewText,
    content: loremIpsumRichText,
    createdBy: mockUsers[3],
    createdAt: new Date(),
  },
  {
    id: "p15",
    title: "Algorithms 101",
    previewText: loremIpsumPreviewText,
    content: loremIpsumRichText,
    createdBy: mockUsers[4],
    createdAt: new Date(),
  },
];
