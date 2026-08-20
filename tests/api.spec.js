import { test, expect } from "@playwright/test";

test.describe.configure({ mode: "serial" });
test.describe("API-тесты для Restful-booker @api", () => {
  const baseURL = "https://restful-booker.herokuapp.com";

  let bookingId;
  let token;
  const postData = {
    firstname: "Nikita",
    lastname: "Shkatula",
    totalprice: 150,
    depositpaid: true,
    bookingdates: {
      checkin: "2026-09-01",
      checkout: "2026-09-10",
    },
    additionalneeds: "Breakfast",
  };

  test("Создание бронирования (Create - POST) @api", async ({ request }) => {
    const responsePost = await request.post(`${baseURL}/booking`, {
      data: postData,
    });

    expect(responsePost.status()).toBe(200);
    const responseBody = await responsePost.json();
    bookingId = responseBody.bookingid;
    expect(responseBody).toHaveProperty("bookingid");
    console.log("Созданный объект:", responseBody);
    expect(responseBody.booking).toEqual(postData);
  });

  test("Получение информации о бронировании (Read - GET) @api", async ({
    request,
  }) => {
    const responseGet = await request.get(`${baseURL}/booking/${bookingId}`);
    expect(responseGet.status()).toBe(200);
    const responseBody = await responseGet.json();
    expect(responseBody).toEqual(postData);
  });

  test("Обновление бронирования (Update - PUT) @api", async ({ request }) => {
    const putData = {
      username: "admin",
      password: "password123",
    };

    const responsePost = await request.post(`${baseURL}/auth`, {
      data: putData,
    });

    const responsePostBody = await responsePost.json();
    token = responsePostBody.token;

    const updatedData = {
      firstname: "Mikita",
      lastname: "Shkatula",
      totalprice: 350,
      depositpaid: true,
      bookingdates: {
        checkin: "2026-09-01",
        checkout: "2026-09-10",
      },
      additionalneeds: "Breakfast",
    };

    const responsePut = await request.put(`${baseURL}/booking/${bookingId}`, {
      headers: {
        Cookie: `token=${token}`,
      },
      data: updatedData,
    });

    expect(responsePut.status()).toBe(200);
    const responsePutBody = await responsePut.json();
    console.log("Измененный объект", responsePutBody);
    expect(responsePutBody).toEqual(updatedData);
  });

  test("Удаление бронирования (Delete - DELETE) @api", async ({ request }) => {
    const responseDelete = await request.delete(
      `${baseURL}/booking/${bookingId}`,
      {
        headers: {
          Cookie: `token=${token}`,
        },
      },
    );

    expect(responseDelete.status()).toBe(201);

    const responseGet = await request.get(`${baseURL}/booking/${bookingId}`);
    expect(responseGet.status()).toBe(404);
  });
});
