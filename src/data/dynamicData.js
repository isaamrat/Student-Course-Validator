//Number of failed allowed for each course
export const failAllowed = 3;

//Number of gap allowed while retaking any course
export const retakeGapAllowed = 2;

//Latest Threshold CGPA
export const latestProbationThresholdCGPA = 2.0;

//CS courses prerequisite
export const csCoursesPrerequisite = {
    CSE111: { preRequisite: ["CSE110 (HP)"], fullChainPreRequisite: "" },
    CSE220: {
      preRequisite: ["CSE111 (HP)", "CSE230 (HP)"],
      fullChainPreRequisite: "CSE230-CSE111-CSE110",
    },
    CSE221: {
      preRequisite: ["CSE220 (HP)"],
      fullChainPreRequisite: "CSE220-CSE111-CSE110",
    },
    CSE310: {
      preRequisite: ["CSE370 (HP)"],
      fullChainPreRequisite: "CSE370-CSE221-CSE220-CSE111-CSE110",
    },
    CSE321: {
      preRequisite: ["CSE221 (HP)"],
      fullChainPreRequisite: "CSE221-CSE220-CSE111-CSE110",
    },
    CSE330: {
      preRequisite: ["MAT216 (HP)"],
      fullChainPreRequisite: "MAT120-MAT110",
    },
    CSE331: {
      preRequisite: ["CSE221 (HP)"],
      fullChainPreRequisite: "CSE221-CSE220-CSE111-CSE110",
    },
    CSE340: { preRequisite: ["CSE260 (SP)"], fullChainPreRequisite: "" },
    CSE370: {
      preRequisite: ["CSE221 (HP)"],
      fullChainPreRequisite: "CSE221-CSE220-CSE111-CSE110",
    },
    CSE410: {
      preRequisite: ["CSE321 (HP)"],
      fullChainPreRequisite: "CSE321-CSE221-CSE220-CSE111-CSE110",
    },
    CSE420: {
      preRequisite: ["CSE321 (HP)", "CSE331 (HP)", "CSE340 (HP)"],
      fullChainPreRequisite: "CSE321-CSE331-CSE340-CSE221-CSE220-CSE111-CSE110",
    },
    CSE422: {
      preRequisite: ["CSE221 (HP)"],
      fullChainPreRequisite: "CSE221-CSE220-CSE111-CSE110",
    },
    CSE423: {
      preRequisite: ["MAT216 (HP)"],
      fullChainPreRequisite: "MAT216-MAT120-MAT110",
    },
    CSE430: {
      preRequisite: ["MAT120 (HP)"],
      fullChainPreRequisite: "MAT120-MAT110",
    },
    CSE470: {
      preRequisite: ["CSE370 (HP)"],
      fullChainPreRequisite: "CSE370-CSE221-CSE220-CSE111-CSE110",
    },
    ENG102: { preRequisite: ["ENG101 (HP)"], fullChainPreRequisite: "ENG101" },
    ENG103: { preRequisite: ["ENG102 (HP)"], fullChainPreRequisite: "ENG102" },
    MAT120: { preRequisite: ["MAT110 (HP)"], fullChainPreRequisite: "MAT110" },
    MAT215: {
      preRequisite: ["MAT216 (HP)"],
      fullChainPreRequisite: "MAT216-MAT120-MAT110",
    },
    MAT216: {
      preRequisite: ["MAT120 (HP)"],
      fullChainPreRequisite: "MAT120-MAT110",
    },
    PHY112: { preRequisite: ["PHY111 (HP)"], fullChainPreRequisite: "PHY111" },
  };
  
//CSE courses prerequisite
export  const cseCoursesPrerequisite = {
    CSE111: { preRequisite: ["CSE110 (HP)"], fullChainPreRequisite: "" },
    CSE220: {
      preRequisite: ["CSE111 (HP)", "CSE230 (HP)"],
      fullChainPreRequisite: "CSE230-CSE111-CSE110",
    },
    CSE221: {
      preRequisite: ["CSE220 (HP)"],
      fullChainPreRequisite: "CSE220-CSE111-CSE110",
    },
    CSE250: { preRequisite: ["PHY112 (SP)"], fullChainPreRequisite: "" },
    CSE251: { preRequisite: ["CSE250 (HP)"], fullChainPreRequisite: "CSE250" },
    CSE260: {
      preRequisite: ["CSE251 (HP)"],
      fullChainPreRequisite: "CSE251-CSE250",
    },
    CSE310: {
      preRequisite: ["CSE370 (HP)"],
      fullChainPreRequisite: "CSE370-CSE221-CSE220-CSE111-CSE110",
    },
    CSE321: {
      preRequisite: ["CSE221 (HP)"],
      fullChainPreRequisite: "CSE221-CSE220-CSE111-CSE110",
    },
    CSE330: {
      preRequisite: ["MAT216 (HP)"],
      fullChainPreRequisite: "MAT120-MAT110",
    },
    CSE331: {
      preRequisite: ["CSE221 (HP)"],
      fullChainPreRequisite: "CSE221-CSE220-CSE111-CSE110",
    },
    CSE340: {
      preRequisite: ["CSE260 (SP)"],
      fullChainPreRequisite: "CSE260-CSE251-CSE250",
    },
    CSE341: {
      preRequisite: ["CSE340 (SP)", "CSE321 (SP)"],
      fullChainPreRequisite: "",
    },
    CSE350: {
      preRequisite: ["CSE251 (HP)"],
      fullChainPreRequisite: "CSE251-CSE250",
    },
    CSE360: { preRequisite: ["CSE341 (HP)"], fullChainPreRequisite: "CSE341" },
    CSE370: {
      preRequisite: ["CSE221 (HP)"],
      fullChainPreRequisite: "CSE221-CSE220-CSE111-CSE110",
    },
    CSE410: {
      preRequisite: ["CSE321 (HP)"],
      fullChainPreRequisite: "CSE321-CSE221-CSE220-CSE111-CSE110",
    },
    CSE420: {
      preRequisite: ["CSE321 (HP)", "CSE331 (HP)", "CSE340 (HP)"],
      fullChainPreRequisite: "CSE321-CSE331-CSE340-CSE221-CSE220-CSE111-CSE110",
    },
    CSE421: { preRequisite: ["CSE320 (SP)"], fullChainPreRequisite: "" },
    CSE422: {
      preRequisite: ["CSE221 (HP)"],
      fullChainPreRequisite: "CSE221-CSE220-CSE111-CSE110",
    },
    CSE423: {
      preRequisite: ["MAT216 (HP)"],
      fullChainPreRequisite: "MAT216-MAT120-MAT110",
    },
    CSE430: {
      preRequisite: ["MAT120 (HP)"],
      fullChainPreRequisite: "MAT120-MAT110",
    },
    CSE460: {
      preRequisite: ["CSE260 (HP)"],
      fullChainPreRequisite: "CSE260-CSE251-CSE250",
    },
    CSE461: {
      preRequisite: ["CSE260 (HP)"],
      fullChainPreRequisite: "CSE260-CSE251-CSE250",
    },
    CSE470: {
      preRequisite: ["CSE370 (HP)"],
      fullChainPreRequisite: "CSE370-CSE221-CSE220-CSE111-CSE110",
    },
    CSE471: {
      preRequisite: ["CSE370 (HP)"],
      fullChainPreRequisite: "CSE370-CSE221-CSE220-CSE111-CSE110",
    },
    ENG102: { preRequisite: ["ENG101 (HP)"], fullChainPreRequisite: "ENG101" },
    ENG103: { preRequisite: ["ENG102 (HP)"], fullChainPreRequisite: "ENG102" },
    MAT120: { preRequisite: ["MAT110 (HP)"], fullChainPreRequisite: "MAT110" },
    MAT215: {
      preRequisite: ["MAT216 (HP)"],
      fullChainPreRequisite: "MAT216-MAT120-MAT110",
    },
    MAT216: {
      preRequisite: ["MAT120 (HP)"],
      fullChainPreRequisite: "MAT120-MAT110",
    },
    PHY112: { preRequisite: ["PHY111 (HP)"], fullChainPreRequisite: "PHY111" },
  };
  