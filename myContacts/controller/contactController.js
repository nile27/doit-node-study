const asyncHandler = require("express-async-handler");
const Contact = require("../models/contactModel");
// @desc Get all contacts
// @route GET /contacts

const getAllContacts = asyncHandler(async (req, res) => {
  // 전체 연락처 보기
  const contacts = await Contact.find();
  const users = [
    { name: "Kim", email: "kim@abc.com", phone: "12345" },
    { name: "Lim", email: "Lim@abc.com", phone: "12341235" },
  ];

  res.render("getAll", { users: users });
});

//  Create a contact
//  POST /contacts
const createContact = asyncHandler(async (req, res) => {
  // 새 연락처 추가하기
  console.log(req);
  const { name, email, phone } = req.body;
  if (!name || !email || !phone) {
    return res.status(400).send("필수값이 입력되지 않았습니다.");
  }
  const contact = await Contact.create({
    name,
    email,
    phone,
  });
  res.status(201).send("Create Contacts");
});

// @desc Get contact
// @route GET /contacts/:id
const getContact = asyncHandler(async (req, res) => {
  // 연락처 상세 보기
  const contact = await Contact.findById(req.params.id);
  res.status(200).send(contact);
});

// @desc Update contact
// @route PUT /contacts/:id
const updateContact = asyncHandler(async (req, res) => {
  // 연락처 수정하기
  const id = req.params.id;
  const { name, email, phone } = req.body;
  const contact = await Contact.findById(id);

  if (!contact) {
    throw new Error("Contact not found.");
  }

  contact.name = name;
  contact.email = email;
  contact.phone = phone;

  contact.save();

  res.status(200).json(contact);
});

// @desc Delete contact
// @route DELETE /contacts/:id
const deleteContact = asyncHandler(async (req, res) => {
  // 연락처 삭제하기
  const id = req.params.id;
  const contact = await Contact.findById(id);

  if (!contact) {
    throw new Error("Contact not found.");
  }

  await Contact.deleteOne();
  res.send("Deleted");
});

module.exports = {
  getAllContacts,
  createContact,
  getContact,
  updateContact,
  deleteContact,
};
