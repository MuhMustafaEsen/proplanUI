// templates.ts
export interface SubTaskTemplateItem {
  id: string;
  title: string;
  description?: string;
}

export interface SubTaskTemplate {
  id: string;
  title: string;
  items: SubTaskTemplateItem[];
}

export const SUBTASK_TEMPLATES: SubTaskTemplate[] = [
  {
    id: "reels",
    title: "REELS",
    items: [
      { id: "reels-1", title: "Video Çekimi", description: "" },
      { id: "reels-2", title: "Kurgu", description: "" },
      { id: "reels-3", title: "Müşteri ile Paylaşıldı", description: "" },
      { id: "reels-4", title: "Paylaşım Yapıldı", description: "" },
    ],
  },
  {
    id: "post",
    title: "POST",
    items: [
      { id: "post-1", title: "Görsel Tasarım", description: "" },
      { id: "post-2", title: "Metin Yazımı", description: "" },
      { id: "post-3", title: "Müşteri Onayı", description: "" },
      { id: "post-4", title: "Paylaşım", description: "" },
    ],
  },
];

/*
Description: "bla"
Title: "blabla"
order: 3
taskAssignmentId: 3
*/ 