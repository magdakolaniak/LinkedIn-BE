import PdfPrinter from 'pdfmake';
import striptags from 'striptags';
import axios from 'axios';
import nodemon from 'nodemon';

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
  let imagePart = {};
  if (user.username.avatar) {
    const response = await axios.get(user.username.avatar, {
      responseType: 'arraybuffer',
    });
    const userAvatarURLParts = user.username.avatar.split('/');
    const fileName = userAvatarURLParts[userAvatarURLParts.length - 1];
    const [id, extension] = fileName.split('.');
    const base64 = response.data.toString('base64');
    const base64Image = `data:image/${extension};base64,${base64}`;
    imagePart = { image: base64Image, width: 100, margin: [0, 0, 0, 40] };
  }
  const docDefinition = {
    content: [
      {
        text: `${user.username.name} ${user.username.surname} CV`,
        fontSize: 20,
        bold: true,
        margin: [200, 0, 0, 0],
      },
      {
        style: 'ownStyle',
        table: {
          body: [
            [
              imagePart,
              {
                stack: [
                  'Personal details',

                  `NAME: ${user.username.name}`,
                  `SURNAME: ${user.username.surname}             `,
                  `TITLE ${user.username.title}`,
                  `E-MAIL: ${user.username.email}`,
                  `BIO: ${user.username.title}`,
                  ,
                  ,
                ],
              },
            ],
          ],
        },
      },

      {
        style: 'ownStyle',
        table: {
          body: [
            [
              { text: 'COMAPANY', style: 'title' },

              {
                stack: [
                  `${user.company}`,
                  {
                    style: 'forList',
                    ul: [
                      `role: ${user.role}`,
                      `description: ${user.description}`,
                      `area: ${user.area}`,
                      `Star Date: ${user.startDate}`,
                      `End Date: ${user.endDate}`,
                    ],
                  },
                ],
              },
            ],
          ],
        },
      },
      ,
    ],
    styles: {
      ownStyle: {
        fontSize: 16,
        bold: true,
        lineHeight: 2,
        borderColor: 0,
        border: [false, false, false, false],
      },
      forList: {
        fontSize: 16,
        bold: false,
        border: [false, false, false, false],
      },
      title: {
        fontSize: 16,
        marginTop: 100,
      },
      brandNew: {
        marginLeft: 100,
      },
    },
  };
  const pdfDoc = printer.createPdfKitDocument(docDefinition);
  return pdfDoc;
};
