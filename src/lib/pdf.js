import PdfPrinter from 'pdfmake';

import axios from 'axios';

const fonts = {
  Roboto: {
    normal: 'Helvetica',
    bold: 'Helvetica-Bold',
    italics: 'Helvetica-Oblique',
    bolditalics: 'Helvetica-BoldOblique',
  },
};

const printer = new PdfPrinter(fonts);

export const generateCV = async (user) => {
  console.log(user);
  let imagePart = {};
  let start = user.experiences[0].startDate;
  let day = start.getDay();
  let month = start.getMonth();
  let year = start.getFullYear();
  // let cut = start.split('');
  console.log(day, month, year);
  if (user.avatar) {
    const response = await axios.get(user.username.avatar, {
      responseType: 'arraybuffer',
    });
    const userAvatarURLParts = user.avatar.split('/');
    const fileName = userAvatarURLParts[userAvatarURLParts.length - 1];
    const [extension] = fileName.split('.');
    const base64 = response.data.toString('base64');
    const base64Image = `data:image/${extension};base64,${base64}`;
    imagePart = { image: base64Image, width: 100, margin: [0, 0, 0, 40] };
  }
  const docDefinition = {
    content: [
      {
        text: `${user.name} ${user.surname} CV`,
        fontSize: 20,
        bold: true,
        margin: [150, 10, 100, 40],
      },

      {
        style: 'ownStyle',
        table: {
          body: [
            [
              imagePart,
              {
                stack: [
                  [
                    {
                      text: [
                        { text: 'Name:', style: 'nameHeaders' },
                        ` ${user.name}`,
                      ],
                    },
                  ],

                  [
                    {
                      text: [
                        { text: 'Surname:', style: 'nameHeaders' },
                        ` ${user.surname}`,
                      ],
                    },
                  ],
                  [
                    {
                      text: [
                        { text: 'Title:', style: 'nameHeaders' },
                        ` ${user.title}`,
                      ],
                    },
                  ],
                  [
                    {
                      text: [
                        { text: 'E-mail adress:', style: 'nameHeaders' },
                        ` ${user.email}`,
                      ],
                    },
                  ],
                  [
                    {
                      text: [
                        { text: 'Short bio: ', style: 'nameHeaders' },
                        ` ${user.bio}`,
                      ],
                    },
                  ],
                ],
              },
            ],
          ],
        },
        layout: 'noBorders',
        margin: [60, 0, 0, 0],
      },
      { text: 'WORKING EXPERIENCE:', style: 'headline' },

      {
        style: 'ownStyle',
        table: {
          body: [
            [
              [
                { text: 'Beggining:', style: 'leftColumn' },
                { text: `${year}-0${month}-0${day}`, style: 'dates' },
                { text: 'Ended:', style: 'leftColumn2' },
                { text: `${year}-0${month}-0${day}`, style: 'dates' },
                ,
              ],

              {
                stack: [
                  [
                    {
                      text: `${user.experiences[0].company}`,
                      style: 'companyName',
                    },
                  ],
                  {
                    style: 'forList',
                    type: 'none',
                    ul: [
                      [
                        { text: 'ROLE IN THE COMPANY:', style: 'titles' },
                        {
                          text: `${user.experiences[0].role}`,
                          style: 'description',
                        },
                      ],
                      [
                        { text: 'DESCRIPTION OF DUTIES:', style: 'titles' },
                        {
                          text: `${user.experiences[0].description}`,
                          style: 'description',
                        },
                      ],
                      [
                        { text: 'AREA OF WORKING:', style: 'titles' },
                        {
                          text: `${user.experiences[0].area}`,
                          style: 'description',
                        },
                      ],
                    ],
                  },
                ],
                margin: [50, 0, 0, 0],
              },
            ],
          ],
          margin: [220, 0, 0, 0],
        },
      },
      {
        style: 'ownStyle',
        pageBreak: 'before',
        table: {
          body: [
            [
              [
                { text: 'Beggining:', style: 'leftColumn' },
                { text: `${year}-0${month}-0${day}`, style: 'dates' },
                { text: 'Ended:', style: 'leftColumn2' },
                { text: `${year}-0${month}-0${day}`, style: 'dates' },
                ,
              ],

              {
                stack: [
                  [
                    {
                      text: `${user.experiences[1].company}`,
                      style: 'companyName',
                    },
                  ],
                  {
                    style: 'forList',
                    type: 'none',
                    ul: [
                      [
                        { text: 'ROLE IN THE COMPANY:', style: 'titles' },
                        {
                          text: `${user.experiences[1].role}`,
                          style: 'description',
                        },
                      ],
                      [
                        { text: 'DESCRIPTION OF DUTIES:', style: 'titles' },
                        {
                          text: `${user.experiences[1].description}`,
                          style: 'description',
                        },
                      ],
                      [
                        { text: 'AREA OF WORKING:', style: 'titles' },
                        {
                          text: `${user.experiences[1].area}`,
                          style: 'description',
                        },
                      ],
                    ],
                  },
                ],
                margin: [50, 0, 0, 0],
              },
            ],
          ],
          margin: [220, 0, 0, 0],
        },
      },
    ],
    styles: {
      ownStyle: {
        fontSize: 16,
        bold: true,
        lineHeight: 2,
        margin: [20, 20, 20, 20],
      },
      companyName: {
        margin: [12, 20, 20, 20],
      },
      description: {
        margin: [0, 0, 30, 20],
      },
      forList: {
        fontSize: 16,
        bold: false,
        border: [false, false, false, false],
      },
      check: {
        margin: [20, 0, 0, 0],
      },

      // brandNew: {
      //   marginLeft: 100,
      // },
      titles: {
        italics: true,
        fontSize: 16,
        // margin: [0, 10, 150, 0],
      },
      leftColumn: {
        margin: [15, 20, 20, 0],
      },
      leftColumn2: {
        margin: [15, 100, 20, 0],
      },
      dates: {
        margin: [20, 30, 0, 40],
      },
      headline: {
        margin: [140, 20, 0, 20],
        fontSize: 16,
      },
      nameHeaders: {
        bold: false,
        italics: true,
      },
    },
  };
  const pdfDoc = printer.createPdfKitDocument(docDefinition);
  return pdfDoc;
};
