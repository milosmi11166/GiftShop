
insert into giftshop.usertype
values (1, "Administrator"), (2, "User");

insert into giftshop.category
values (1, "Odeća"), (2, "Mobilni telefoni"),(3, "Automobili"), (4, "Računari");

insert into giftshop.user
values (1, "pera@gmail.com", "AFSDF@$#OJFASDH@#$@O#PDQSDA455356afsdfSDF#@$@QSADFAFVCVzxcxclfg", "Petar Petrović", "Strahinjića Bana 133, Beograd", "0651659751", now(), 2);

insert into giftshop.gift
values (1, "Samsung Galaxy s7", "Poklanjam Samsung Galaxy s7", null, null, null, true, 2, 1),
(2, "Jakna Zara", "Poklanjam Jakna Zara", null, null, null, true, 1, 1);